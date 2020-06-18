import IBaseBox from '../IBaseBox';
import * as boxFragment from '../../fragment/box';
import * as fragment from './fragment';
import * as fsExtra from 'fs-extra';
import * as path from 'path';
import * as cheerio from 'cheerio';
import * as mkdirp from 'mkdirp';
import * as util from 'util';
import Config from '../../../config';
import VueGenerator from '../../generator';
import * as prettier from 'prettier';
import generate from '@babel/generator';
import Base from '../Base';
import * as _ from 'lodash';


const templateStr =  `
  <template>
    <div class="root">
      <box-form></box-form>
    </div>
  </template>
`;


export interface IFormSetting{
  dataCode: string;
  inline: boolean;
}

export default class Form extends Base implements IBaseBox{
  $fragment: any;
  template: string;
  name: string;
  VueGenerator: any;
  blockPath: string;
  insertComponents:string[] = [];
  components: any = [];
  $blockTemplate: any;
  activeIndex: number = -1;
  insertFileType: string = 'block';
  
  data: any = {};
  methods: any = {};
  type: number = 0; // 0: 编辑 1: 预览
  boxIndex: number;
  iFormAttrs: any = {};

  settingData: IFormSetting = {
    dataCode: `var data = {}`,
    inline: false
  }

  currentComp: any = null;

  constructor (data: any, storage: any) {
    super(storage);
    const { boxIndex, params } = data;
    const {blockName} = params;
    this.boxIndex = boxIndex;
    this.name = blockName;
    this.insertComponents.push(this.name);

    this.$fragment = cheerio.load(` 
    <div class="box">
      <${this.name} />
    </div>
  `, {
      xmlMode: true,
      decodeEntities: false
    });

    this.$blockTemplate = cheerio.load(templateStr, {
      xmlMode: true,
      decodeEntities: false
    });

    this.resetRender = _.throttle(this.resetRender, 10);
    this.renderBox = _.throttle(this.renderBox, 10);

    this.$blockTemplate('box-form').append(fragment.eform());
    this.VueGenerator = new VueGenerator('block');
    this.init();
    this.VueGenerator.appendData();
    this.observeComp();
  }

  init () {
    mkdirp.sync(Config.componentsDir);
    this.blockPath = path.join(Config.componentsDir, `${this.name}.vue`);
    this.render();
  }

  public getFragment(index: number, type: number = 0): any {
    return this.$fragment;
  }

  public setPreview () {
    const type = this.storage.get('preview_view_status') || 0;
    if (this.type === type) {
      return;
    } else {
      this.type = type;
    }
    if (type === 0) {
      this.$blockTemplate = cheerio.load(templateStr, {
        xmlMode: true,
        decodeEntities: false
      });
  
      this.$blockTemplate('box-form').append(fragment.eform());
    } else {
      this.$fragment = cheerio.load(`<${this.name} />`, {
        xmlMode: true,
        decodeEntities: false
      });
      this.$blockTemplate = cheerio.load(`
        <template>
          <div class="root">
          </div>
        </template>
      `, {
        xmlMode: true,
        decodeEntities: false
      });
  
      this.$blockTemplate('.root').append(fragment.eform());
    }

    this.resetRender()

    setTimeout(() => {
      this.observeComp();
    }, 500)
  }

  public addComponent (data: any) {
    const { key, boxData, name, params } = data;
    const dynamicObj = require(`../../component/${key}`).default;
    const componentIndex = this.components.length;
    const compParams = {};
    if (name) {
      compParams['v-model'] = name;
    }
    
    let currentComp = this.findComponent(boxData.params ? boxData.params.uuid : '', this.components);
    if (currentComp) {
      if (currentComp.name === 'ArrayListBox') {
        compParams['v-model'] = `item.${compParams['v-model']}`
      }
      currentComp.components.push(new dynamicObj(compParams, componentIndex, params))
    } else {

      this.components.push(new dynamicObj(compParams, componentIndex, params))
    }
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
      this.settingData.dataCode = data.code;
      const dataCode = this.VueGenerator.getDataStrAst(this.settingData.dataCode);
      this.VueGenerator.appendData(dataCode);
      this.render();
    } else if (handler === 'formInline') {
      this.iFormAttrs[data.key] = data.value;
      this.resetRender();
      this.observeComp();
    } else if (handler === 'addLabel') {
      this.addlabel(data);
    } else {
      if (this[handler]) {
        this[handler](data);
      }
    }
    // this.resetRender();
  }


  private resetInitScript () {
    this.VueGenerator.initScript();
    const dataCode = this.VueGenerator.getDataStrAst(this.settingData.dataCode);
    this.VueGenerator.appendData(dataCode);
  }

  private settingConfig (data) {
    const {uuid, config} = data;
    const current = this.findComponent(uuid, this.components);
    current && current.setConfig(config);
  }

  private setActiveIndex (data) {
    this.activeIndex = parseInt(data.index, 10);
  }

  private addlabel (params: any) {
    const currentComp = this.findComponent(params.uuid, this.components);
    currentComp && currentComp.setLabel(params.value);
  }
  
  public getSetting () {
    return {
      data: this.settingData
    }
  }

  public getBoxChildConfig (params:  {
    uuid: string,
    boxIndex: number
  }) {
    const {uuid} = params;
    const current = this.findComponent(uuid, this.components);
    if (current &&current.getConfig) {
      return current.getConfig();
    } else {
      return {};
    } 
  }

  public renderBox () {
    this.$blockTemplate('el-form').empty();
    this.resetInitScript();
    for (let key in this.iFormAttrs) {
      this.$blockTemplate('el-form').attr(key, this.iFormAttrs[key]);
    }
    this.renderBoxRecursion(this.components, 0);
  }

  public renderBoxRecursion (components: any, flag: number) {
    if (Array.isArray(components)) {
      components.forEach((component, index) => {
        if (flag === 0) {
          if (this.type === 0) {
            const componentBox = 
              component.type === 'box' 
              ? component.getFragment(this.type).html() 
              : `<component-box indexcomp="${index}" uuid="${component.uuid}">
                  ${component.getFragment(this.type).html()}
                </component-box>`;

            this.$blockTemplate('el-form').append(
              componentBox
            );
          } else {
            this.$blockTemplate('el-form').append(component.getFragment(this.type).html());
          }
        }
        if (component.type === 'box') {
          this.renderBoxRecursion(component.components, 1);
        }

        if (component.insertComponents) {
          component.insertComponents.forEach(item => {
            this.VueGenerator.appendComponent(item, true);
          })
        }
      
        if (component.vueParse) {
          component.vueParse.methods && this.VueGenerator.appendMethods(component.vueParse.methods);
          component.vueParse.data && this.VueGenerator.appendData(component.vueParse.data);
        }
      });
    }
   
  }

  public render () {
    const template = `${this.$blockTemplate.html()}\n<script>${generate(this.VueGenerator.pageAST).code}</script>`;
    const formatTemp = prettier.format(template, { semi: true, parser: "vue" });
    setTimeout(() => {
      fsExtra.writeFile(this.blockPath, formatTemp, 'utf8');
    }, 20)
  }

  setTemplate () {

  }
}