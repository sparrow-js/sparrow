import { v4 as uuid } from '@lukeed/uuid';
import * as _ from 'lodash';
import * as cheerio from 'cheerio';
// import Block from './Block';

export default class Base {
  public uuid = '';
  components: any = [];
  storage: any = {};
  observe: any = null;
  $fragment: any = null;
  name: string = '';
  alias: string = '';
  treePath:string = ''; // 标记容器树路径
  previewType: number = 0;
  config: any = {};
  _attrStr: string = '';
  widgetType: string = 'box';

  constructor (storage) {
    this.storage = storage;
    this.uuid = uuid().split('-')[0]; 
  }

  resetRender () {}

  public getFragment(index: number): any {
    const type = this.storage.get('preview_view_status').value() || 0;
    let box = '';

    if (type === 0) {
      this.$fragment.root().children().attr('data-design-mode', 'design-border-box');
      this.$fragment.root().children().attr('data-instance-name', this.name);
      this.$fragment.root().children().attr('data-id', this.uuid);
      this.$fragment.root().children().attr('data-type', 'box');
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
      let { id, params = {}, nextSiblingId, config, path, type } = data;
      if (config) {
        config.initType = operatetype;
      }
      let compIndex = -2;
      if (nextSiblingId) {
        compIndex = this.components.findIndex(item => item.uuid === nextSiblingId);
      }

      let isPlugins = false;
      if (id.includes('sparrow')) {
        isPlugins = true;
      }
      let backComp = null;
      if (isPlugins) {
        const dynamicObj = require(path);
        const comp = new dynamicObj(config || data, this.storage);
        comp.path = path;
        if (compIndex >= 0) {
          this.components.splice(compIndex, 0, comp)
        } else {
          this.components.push(comp);
        }
        backComp = comp;
      } 
      // else if (path) {
      //   const dynamicObj = require(`..${path}`);
      //   const comp = new dynamicObj(config || data, this.storage);
      //   comp.path = path;
      //   if (compIndex >= 0) {
      //     this.components.splice(compIndex, 0, comp)
      //   } else {
      //     this.components.push(comp);
      //   }
      //   backComp = comp;

      // } 
      else if (type === 'custom') {
        const tempPath = path.split('custom/')[1];
        const dynamicObj = require(`../custom/${tempPath}`);
        const comp = new dynamicObj(config || data, this.storage);
        comp.path = path;
        if (compIndex >= 0) {
          this.components.splice(compIndex, 0, comp)
        } else {
          this.components.push(comp);
        }
        backComp = comp;
      } else if (type === 'EditBlock') {
        const tempPath = path.split('EditBlock/')[1];
        const dynamicObj = require(`../EditBlock/${tempPath}`);
        const comp = new dynamicObj(config || data, this.storage);
        comp.path = path;
        if (compIndex >= 0) {
          this.components.splice(compIndex, 0, comp)
        } else {
          this.components.push(comp);
        }
        backComp = comp;
      } else if (type === 'box') {
        let boxPath = id;
        if (path) {
          boxPath = path.split('box/')[1];
        }
        const dynamicObj = require(`../box/${boxPath}`);
        const comp = new dynamicObj(data, this.storage)
        if (compIndex >= 0) {
          this.components.splice(compIndex, 0, comp)
        } else {
          this.components.push(comp);
        }
        backComp = comp;
      } else {
        const dynamicObj = require(`../component/${id}`);
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

  // public async addBlock (params, ctx) {
  //   const {nextSiblingId} = params;
  //   const block = new Block(this.storage);
  //   let compIndex = -2;
  //   if (nextSiblingId) {
  //     compIndex = this.components.findIndex(item => item.uuid === nextSiblingId);
  //   }

  //   if (compIndex >= 0) {
  //     this.components.splice(compIndex, 0, block);
  //   } else {
  //     this.components.push(block);
  //   }

  //   await block.addBlock(params);
  //   const { socket } = ctx;
  //   socket.emit('generator.scene.block.status', {status: 0, data: {
  //     status: 2,
  //     message: 'complete',
  //   }});
  // }

  public settingConfig (config: any) {
    this.config = config;
    this.setAttrsToStr();
    this.customAttrHandler();
  }

  public customAttrHandler () {}

  public setAttrsToStr () {
    const {config} = this;
    if (_.get(config, 'model.attr')) {
      const formField = [];
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
    const type = this.storage.get('preview_view_status').value() || 0;

    this.$fragment('.drag-box').first().empty();
    this.components.forEach(component => {
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