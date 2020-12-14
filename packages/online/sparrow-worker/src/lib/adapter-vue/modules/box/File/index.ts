import IBaseBox from '../IBaseBox';
import * as cheerio from 'cheerio';
import * as util from 'util';
import Config from '../../../config';
import * as prettier from 'prettier';
import Base from '../Base';
import * as _ from 'lodash';
import VueGenerator from '../../generator';
import {blockList} from '../../fragment/scene';
import * as upperCamelCase from 'uppercamelcase';
import generate from '@babel/generator';
import LifeCycle from '../../LifeCycle'
import ApiComp from '../../api';
import Message from '../../../../../utils/message';
import parserHtml from 'prettier/parser-html';
import parserBabel from 'prettier/parser-babel';


const uuid = require('@lukeed/uuid');

export default class File extends Base implements IBaseBox{
  template: string;
  name: string = 'File';
  fileName: string = '';
  blockPath: string;
  insertComponents:string[] = [];
  components: any = [];
  
  data: any = {};
  methods: any = {};
  VueGenerator: any;
  $: any;
  storage: any;
  scriptData: any;
  formatTemp: string = '';
  style: string = '';
  storeStyleRepeat = [];

  config: any = {
    inline: false
  }

  params: any = null;

  currentComp: any = null;

  constructor (data: any, storage: any) {
    super(storage);
    this.storage = storage;
    const { params, config, fileName} = data;
    this.params = params;
    if (config) {
      this.config = config;
    } else {
      this.initApi();
    }
    
    this.fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
    this.insertComponents.push(this.fileName);
    this.$fragment = cheerio.load(`<${this.fileName} />`, {
      xmlMode: true,
      decodeEntities: false
    });
    const templateStr =  `
      <template>
        <div class="home-file drag-box" data-id="${this.uuid}">
        </div>
      </template>
    `;

    this.$ = cheerio.load(templateStr, {
      xmlMode: true,
      decodeEntities: false
    });

    this.VueGenerator = new VueGenerator('block');
    this.init();
    this.initLifeCycle();
  }

  init () {
    this.blockPath = `/src/views/components/${this.fileName}.vue`;
  }

  public initApi () {
    const apiComp = new ApiComp();
    this.components.push(apiComp);
  }

  private async initLifeCycle() {
    this.components.push(new LifeCycle());
  }

  async getLifeCycle() {
    const lifeCycle = this.components.find(item => item.name === 'lifeCycle');
    return {
      code: lifeCycle.getCode(),
      status: 0
    }  
  }

  async saveLifeCycle (data) {
    const {uuid, code} = data;
    const lifeCycle = this.components.find(item => item.name === 'lifeCycle');
    lifeCycle.setCode(code);
    this.renderPage();
  }

  loopThroughBox (boxs: any,) {
    const leafToRoot = []; 
    const fn = function (boxs) {
      if (Array.isArray(boxs)) {
        boxs.forEach(item => {
          if (item.widgetType === 'box') {
            leafToRoot.unshift(item);
          }
          if (item.components) {
            fn(item.components)
          }
        });
      }
    }
    fn(boxs);
    leafToRoot.forEach(item => {
      item.setPreview && item.setPreview();
    });
  }

  private getCode () {
    const template = `${this.$.html()}\n<script>${generate(this.scriptData).code}</script> <style lang="scss" scoped>${this.style}</style>`;
    const formatTemp = prettier.format(template, { semi: true, parser: "vue" });
    return formatTemp;
  }

  public async renderPage (outputToFile: boolean = true) {
    this.$('.home-file').empty();
    this.scriptData = this.VueGenerator.initScript();
    this.style = '';
    this.storeStyleRepeat = [];
    if (this.config.dataCode) {
      const dataCode = this.VueGenerator.getDataStrAst(this.config.dataCode);
      this.VueGenerator.appendData(dataCode);
    }

    let methods = [];
    let vueData = [];
    let importDeclarations = [];
    let vueComponents = [];

    this.loopThroughBox(this.components);
    const fn = (boxs, flag = 0) => {
      boxs.map((item, index) => {
        if (flag === 0 && item.getFragment) {
          const blockListStr = blockList(index, item.getFragment(index).html());
          this.$('.home-file').append(blockListStr);
        }
        
        if (item.insertComponents && item.insertComponents.length) {
          this.VueGenerator.appendComponent(upperCamelCase(item.insertComponents[0]));
        }
  
        if (item.components) {
          item.components.forEach(comp => {
            if (comp.vueParse) {
              if (!this.hasStyle(comp.name)) {
                this.style += comp.vueParse.style;
                this.storeStyleRepeat.push(comp.name)
              }
              methods = methods.concat(comp.vueParse.methods || []);
              vueData = vueData.concat(comp.vueParse.data || [])
              importDeclarations = importDeclarations.concat(comp.vueParse.importDeclarations || [])
              vueComponents= vueComponents.concat(comp.vueParse.components || []);
            }
          });
        }
        if (item.components && item.components.length > 0) {
          fn(item.components, 1);
        }
  
        if (item.vueParse) {
          if (!this.hasStyle(item.name)) {
            this.style += item.vueParse.style;
            this.storeStyleRepeat.push(item.name)
          }
          item.vueParse.methods && this.VueGenerator.appendMethods(item.vueParse.methods);
          item.vueParse.data && this.VueGenerator.appendData(item.vueParse.data);
          item.vueParse.importDeclarations && this.VueGenerator.appendImport(item.vueParse.importDeclarations);
          this.VueGenerator.appendAutoComponents(item.vueParse.components);
          item.vueParse.created && this.VueGenerator.appendCreated(item.vueParse.created);
        }
  
      });
    }

    fn(this.components);
    
    this.VueGenerator.appendMethods(methods);
    this.VueGenerator.appendData(vueData);
    this.VueGenerator.appendImport(importDeclarations);
    this.VueGenerator.appendAutoComponents(vueComponents);

    if (outputToFile) {
      this.writeTemplate();
    } else {
      return this.getCode();
    }
  }

  private hasStyle (name: string) {
    if (this.storeStyleRepeat.includes(name)) {
      return true;
    }
    return false;
  }

  private writeTemplate () {
    const template = `${this.$.html()}\n<script>${generate(this.scriptData).code}</script> <style lang="scss" scoped>${this.style}</style>`;
    const formatTemp = prettier.format(template, { semi: true, parser:"vue", plugins: [parserHtml, parserBabel]});
    if (formatTemp === this.formatTemp) {
      return;
    }
    this.formatTemp = formatTemp;
    
    Message.emit('generate-file', {
      code: formatTemp,
      path: this.blockPath,
    });
  }
}