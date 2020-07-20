import IBaseBox from '../IBaseBox';
import * as fsExtra from 'fs-extra';
import * as path from 'path';
import * as cheerio from 'cheerio';
import * as mkdirp from 'mkdirp';
import * as util from 'util';
import Config from '../../../config';
import VueGenerator from '../../generator';
import * as prettier from 'prettier';
import generate from '@babel/generator';
import VueParse from '../../generator/VueParse';
import {request} from '../../../../../util/request'
const uuid = require('@lukeed/uuid');
import * as _ from 'lodash';
import * as upperCamelCase from 'uppercamelcase';
import Box from '../Box';

import Base from '../Base';
import Column from './column';


const templateStr =  `
  <template>
    <div class="root">
      <table-box>
        <el-table
          border
          style="width: 100%"
          :data="tableData">
        </el-table>
      </table-box>
      <div class="other"></div>
    </div>
  </template>
`;
export interface IFormSetting{
  headerData: string;
}

export default class Table extends Base implements IBaseBox{
  $fragment: any;
  template: string;
  name: string = 'Table';
  fileName: string;
  VueGenerator: any;
  blockPath: string;
  insertComponents:string[] = [];
  $blockTemplate: any;
  activeIndex: number = -1;
  col: number = 2;

  data: any = {};
  methods: any = {};
  vueParse:any = {};
  previewType: number = 0;
  type: string = 'inline';
  boxStrs: string = '';
  renderStep: boolean = true;
  params: any = null;
  components: any = [];
  storage: any = {};

  settingData: IFormSetting = {
    headerData: ``,
  }

  constructor (data: any, storage: any) {
    super(storage);
    this.storage = storage;
    const { params = {col: 5} } = data;
    this.params = params;
    const {col} = params;
    // this.fileName = blockName.charAt(0).toUpperCase() + blockName.slice(1);

    // this.insertComponents.push(this.fileName);
    this.$fragment = cheerio.load(
      `<div class="box">
        ${templateStr}
      </div>`, {
      xmlMode: true,
      decodeEntities: false
    });

    this.resetRender = _.throttle(this.resetRender, 100);
    // this.VueGenerator = new VueGenerator('block');
    this.init();
    // this.VueGenerator.appendData();
    if (!data.children) {
      this.col = col;
      for (let i = 0; i < this.col; i++) {
        this.components.push(new Column({},this.storage));
      }
    }
  }

  async init () {
    mkdirp.sync(Config.componentsDir);
    this.blockPath = path.join(Config.componentsDir, `${this.fileName}.vue`);
    this.setVueParse('Base');
  }
  

  public getFragment(index: number): any {
    return this.$fragment;
  }

  public setPreview () {
    const type = this.storage.get('preview_view_status') || 0;
    if (this.previewType === type) {
      this.resetRender();
      return;
    }
    
    this.previewType = type;
    if (type === 0) {
      this.$fragment = cheerio.load(`
        <div class="box">
          ${templateStr}
        </div>`, {
        xmlMode: true,
        decodeEntities: false
      });
  
    } else {
      this.$fragment = cheerio.load(`
      <div class="root">
        <el-table
          border
          style="width: 100%"
          :data="tableData">
        </el-table>
        <div class="other"></div>
      </div>
      `, {
        xmlMode: true,
        decodeEntities: false
      });
    }
    this.resetRender()

  }

  public resetRender () {
    this.renderBox();
    this.render();
  }

  public addComponent (data?: any, insterType: string = 'manual') {
    
    if (insterType === 'auto') {
      const column = new Column(data, this.storage);
      this.components.push(column);
      return column;
    } else {
      const {id, params, uuid, type} = data;
      if (type === 'column') {
        const columnIndex = this.components.findIndex(item => item.uuid === id);
        if (columnIndex >= 0) {
          this.components.splice(columnIndex + 1, 0, new Column({},this.storage));
        }
      } else {
        this.components.forEach(item => {
          if (item.uuid === uuid) {
            item.addComponent({
              id: id,
              type,
              params
            });
          }
        });
      }
    }
  }


  public changePosition (order: any) {
    return {
      status: 1,
      message: '暂不支持拖拽'
    }
  }


  public setVueParse (compName: string) {
    const uuidValue = uuid().split('-')[0]; 
    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'box/table',`${compName}.vue`), 'utf8');
    this.vueParse =  new VueParse(uuidValue, fileStr);
  }
  public async setting (data: any) {
    const {uuid, config} = data;
    const comp = this.findComponents(uuid);
    comp && comp.setConfig(config);
  }
  
  private setHeaderData (data) {
    const list = data.code.map(item => {
      if (!item.uuid) {
        item.uuid = uuid().split('-')[0];
      }
      return item;
    });
  }

  private async exportData (data) {
    try {
      const result = await request(data.url);
      this.setHeaderData({
        code: result
      })
    } catch (error) {
      
    }
  }

  private setActiveIndex (data) {
    this.activeIndex = parseInt(data.index, 10);
  }
  
  public getSetting () {
    return {
      data: []
    }
  }

  findComponents (uuid: string) {
    let comp = null;
    this.components.forEach(item => {
      if (item.uuid === uuid) {
        comp = item;
      }
    });
    return comp;
  }

  getBoxChildConfig(params: any) {
    const {uuid} = params;
    const comp = this.findComponents(uuid);
    if (comp) {
      return comp.getConfig();
    } else {
      return null;
    }
  }

  public renderBox () {
    this.renderStep = !this.renderStep;
    this.$fragment('el-table').empty();
    this.$fragment('.other').empty();

    this.$fragment('el-table').append(this.renderColumn());
    this.$fragment('.other').append(this.boxStrs);

    // this.vueParse && this.VueGenerator.appendData(this.vueParse.data)
  }

  public renderColumn () {
    let column = '';
    this.boxStrs = '';
    this.components.forEach(item => {
      column = column + item.getFragment().html();
      if (item.boxStrs) {
        this.boxStrs = this.boxStrs + item.boxStrs;
      }
    })

    // const fn = (components) => {
    //   components.forEach(item => {
    //     if (item.vueParse && item.insertFileType === 'inline') {
    //       item.vueParse.methods && this.VueGenerator.appendMethods(item.vueParse.methods);
    //       item.vueParse.data && this.VueGenerator.appendData(item.vueParse.data);
    //     }
    //     if (item.insertComponents && item.insertComponents.length) {
    //       this.VueGenerator.appendComponent(upperCamelCase(item.insertComponents[0]), true);
    //     }
    //     if (item.insertFileType !== 'block' && item.components && item.components.length > 0) {
    //       fn(item.components)
    //     }
    //   })
    // }

    // fn(this.components);
    return column;
  }
  

  public render () {
    // const template = `${this.$fragment.html()}\n<script>${generate(this.VueGenerator.pageAST).code}</script>`;
    // const formatTemp = prettier.format(template, { semi: true, parser: "vue" });
    // fsExtra.writeFile(this.blockPath, formatTemp, 'utf8');
  }

  setTemplate () {

  }
}