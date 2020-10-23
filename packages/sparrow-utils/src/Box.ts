const uuid = require('@lukeed/uuid');
import * as _ from 'lodash';
import * as cheerio from 'cheerio';
import * as Path from 'path';
import * as fsExtra from 'fs-extra';

export default class Box {
  public uuid = '';
  components: any = [];
  storage: any = {};
  observe: any = null;
  $fragment: any = null;
  name: string = '';
  alias: string = '';
  widgetType: string = 'box';
  treePath:string = ''; // 标记容器树路径
  previewType: number = 0;
  config: any = {};
  _attrStr: string = '';
  globalConfig: any = {};

  constructor (storage: any, globalConfig: any) {
    this.storage = storage;
    this.globalConfig = globalConfig;
    this.uuid = uuid().split('-')[0]; 
  }

  resetRender () {}

  public getFragment(index: number): any {
    const type = this.storage.get('preview_view_status') || 0;
    let box = '';

    if (type === 0) {
      this.$fragment.root().children().attr('data-design-mode', 'design-border');
      this.$fragment.root().children().attr('data-instance-name', this.name);
      this.$fragment.root().children().attr('data-id', this.uuid);
      box = this.$fragment.html();
    } else {
      box = this.$fragment.html()
    }
    return cheerio.load(`
          ${box}
      `, {
        xmlMode: true,
        decodeEntities: false
      });
    ;
  }
  
  public addComponent (data: any, operatetype: string = 'manual') {
      const {projectPaths} = this.globalConfig;
      let { id, params = {}, nextSiblingId, config, path } = data;
      if (config) {
        config.initType = operatetype;
      }
      let compIndex = -2;
      if (nextSiblingId) {
        compIndex = this.components.findIndex((item:any ) => item.uuid === nextSiblingId);
      }

      const hasBox = fsExtra.pathExistsSync(projectPaths.materielPath + `/box/${id}`);
      let isPlugins = false;
      if (id.includes('sparrow')) {
        isPlugins = true;
      }
      let backComp = null;
      if (isPlugins) {
        const dynamicObj = require(path).default;
        const comp = new dynamicObj(config || data, this.storage);
        comp.path = path;
        if (compIndex >= 0) {
          this.components.splice(compIndex, 0, comp)
        } else {
          this.components.push(comp);
        }
        backComp = comp;
      } 
      else if (path) {
        const dynamicObj = require(projectPaths.materielPath + `${path}`).default;
        const comp = new dynamicObj(config || data, this.storage);
        comp.path = path;
        if (compIndex >= 0) {
          this.components.splice(compIndex, 0, comp)
        } else {
          this.components.push(comp);
        }
        backComp = comp;

      } else if (hasBox) {
        const dynamicObj = require(projectPaths.materielPath + `/box/${id}`).default;
        const comp = new dynamicObj(data, this.storage)
        if (compIndex >= 0) {
          this.components.splice(compIndex, 0, comp)
        } else {
          this.components.push(comp);
        }
        backComp = comp;
      } else {
        const dynamicObj = require(projectPaths.materielPath + `/component/${id}`).default;
        const comp = new dynamicObj(config || params, this.treePath);
        if (compIndex >= 0) {
          this.components.splice(compIndex, 0, comp)
        } else {
          this.components.push(comp);
        }
        backComp = null;
      }

      return backComp;
  }

  public settingConfig (config: any) {
    this.config = config;
    this.setAttrsToStr();
    this.customAttrHandler();
  }

  public customAttrHandler () {}

  public setAttrsToStr () {
    const {config} = this;
    if (_.get(config, 'model.attr')) {
      const formField: any = [];
      Object.keys(config.model.attr).forEach(key => {
        if (!config.model.attr[key]) {
          return;
        }
        formField.push(`${key}="${config.model.attr[key]}"`);
      });
      this._attrStr = formField.join(' ');
    }
  }

  public renderComp () {
    const type = this.storage.get('preview_view_status') || 0;

    this.$fragment('.drag-box').first().empty();
    this.components.forEach((component: any) => {
      this.$fragment('.drag-box').first().append(component.getFragment(this.previewType).html());
    });

    if (this.components.length  === 0 && type === 0) {
      this.$fragment('.drag-box').attr('data-empty', true);
    }
  }

  getConfig() {
    return this.config;
  }
}