import IBaseBox from '../IBaseBox';
import * as path from 'path';
import * as cheerio from 'cheerio';
import * as mkdirp from 'mkdirp';
import Config from '../../../config';
import Base from '../Base';
import * as _ from 'lodash';
const templateStr =  `
  <div class="root" >
    <box-form></box-form>
  </div>
`;


export default class Form extends Base implements IBaseBox{
  template: string;
  name: string = 'Form';
  fileName: string = '';
  blockPath: string;
  insertComponents:string[] = [];
  components: any = [];
  $blockTemplate: any;
  insertFileType: string = 'block';
  type:string = 'inline';
  
  data: any = {};
  methods: any = {};
  previewType: number = 0; // 0: 编辑 1: 预览
  iFormAttrs: any = {};
  formatTemp: string = '';

  config: any = {
    inline: false
  }

  params: any = null;

  currentComp: any = null;

  constructor (data: any, storage: any) {
    super(storage);
    const { params, config } = data;
    this.params = params;
    if (config) {
      this.config = config;
    } else {
      this.config = _.cloneDeep(require('./config').default);
    }

    this.$fragment = cheerio.load(templateStr, {
        xmlMode: true,
        decodeEntities: false
      });

    this.resetRender = _.throttle(this.resetRender, 1000);
    this.$fragment('box-form').append(`
      <el-form label-width="100px" ${this._attrStr}>
        <div class="drag-box" data-id=${this.uuid}></div>
      </el-form>
    `);
    this.init();

  }


  init () {
    mkdirp.sync(Config.componentsDir);
    this.blockPath = path.join(Config.componentsDir, `${this.fileName}.vue`);
  }
  

  public setPreview () {
    const type = this.storage.get('preview_view_status') || 0;
    this.previewType = type;
    if (type === 0) {

      this.$fragment = cheerio.load(templateStr, {
        xmlMode: true,
        decodeEntities: false
      });
  
      this.$fragment('box-form').append(`
        <el-form label-width="100px" ${this._attrStr}>
          <div class="drag-box" data-id=${this.uuid}></div>
        </el-form>
      `);
    } else {

      this.$fragment = cheerio.load(` 
        <div class="root">
        </div>
      `, {
        xmlMode: true,
        decodeEntities: false
      });
      this.$fragment('.root').append(`
        <el-form label-width="100px" ${this._attrStr}>
          <div class="drag-box" data-id=${this.uuid}></div>
        </el-form>
      `);
    }
    this.resetRender()
  }

  private findComponent (uuid, components) {
    let tempComp = null;

    const fn = function (uuid, components) {
      if (tempComp === null) {
        if (Array.isArray(components)) {
          components.forEach(item => {
            if (item.uuid === uuid) {
              tempComp = item;
            }
  
            if (item.components && tempComp === null) {
              fn(uuid, item.components)
            }
          });
        } else {
          if(components.uuid === uuid) {
            tempComp = components;
          }
        }
      }
    }

    fn(uuid, components);
    return tempComp;
  }


  public resetRender () {
    this.renderBox();
    this.render(); 
  }


  public setting (data: any) {
    const {handler} = data;
    if (handler === 'data') {
      this.config.dataCode = data.code;
      this.render();
    } else if (handler === 'formInline') {
      this.iFormAttrs[data.key] = data.value;
      this.resetRender();
    } else if (handler === 'addLabel') {
      this.addlabel(data);
    } else {
      if (this[handler]) {
        this[handler](data);
      }
    }
  }

  private addlabel (params: any) {
    const currentComp = this.findComponent(params.uuid, this.components);
    currentComp && currentComp.setLabel(params.value);
  }
  

  public changePosition (order: any) {
    let obj = this.findComponents(order[0]);
    const components = order.reduce((total, key)=> {
      total.push(obj.components.find(comp => comp.uuid === key));
      return total;
    }, []);
    obj.components = components;
  }

  findComponents (uuid: string) {
    let tempComps = null;
    const fn = (components, obj) => {
      if (tempComps) return;
      components.forEach(comp => {
        if (comp.uuid === uuid) {
          tempComps = obj;
          return;
        }
        if (comp.components) {
          fn(comp.components, comp);
        }

      })
    }
    fn(this.components, this);
    return tempComps;
  }

  public renderBox () {

    this.$fragment('.drag-box').empty();
    for (let key in this.iFormAttrs) {
      this.$fragment('el-form').attr(key, this.iFormAttrs[key]);
    }
    this.renderBoxRecursion(this.components, 0);
  }

  public renderBoxRecursion (components: any, flag: number) {
    if (Array.isArray(components)) {
      components.forEach((component, index) => {
        if (flag === 0) {
          if (this.previewType === 0) {
            const componentBox = component.getFragment(this.previewType).html();
              this.$fragment('.drag-box').first().append(
                componentBox
              );
          } else {
            this.$fragment('.drag-box').append(component.getFragment(this.previewType).html());
          }
        }
        if (component.type === 'box') {
          this.renderBoxRecursion(component.components, 1);
        }
      });
    }
   
  }

  public render () {}
}