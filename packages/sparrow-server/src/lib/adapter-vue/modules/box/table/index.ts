import IBaseBox from '../IBaseBox';
import * as boxFragment from '../../fragment/box';
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

const mkdirpAsync = util.promisify(mkdirp);
import Base from '../Base';

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
  tableHeaderData: any =  [];

  data: any = {};
  methods: any = {};
  vueParseMap:any = {};
  type: number = 0;
  boxIndex: number;
  boxStrs: string = '';
  renderStep: boolean = true;

  settingData: IFormSetting = {
    headerData: ``,
  }

  constructor (data: any, storage: any) {
    super(storage);
    const { boxIndex, params } = data;
    this.boxIndex = boxIndex;
    const {blockName, col} = params;
    this.fileName = blockName;
    this.col = col;
    for (let i = 0; i < this.col; i++) {
      this.tableHeaderData.push({
        uuid: uuid().split('-')[0],
        label: '',
      });
    }
    this.insertComponents.push(this.fileName);
    this.$fragment = cheerio.load(
      `<div class="box">
        <${this.fileName} />
      </div>`, {
      xmlMode: true,
      decodeEntities: false
    });

    this.$blockTemplate = cheerio.load(templateStr, {
      xmlMode: true,
      decodeEntities: false
    });

    this.resetRender = _.throttle(this.resetRender, 10);
    this.renderBox = _.throttle(this.renderBox, 10);
    this.VueGenerator = new VueGenerator('block');
    this.init();
    this.VueGenerator.appendData();
    this.observeComp();
  }

  async init () {
    mkdirp.sync(Config.componentsDir);
    this.blockPath = path.join(Config.componentsDir, `${this.fileName}.vue`);
    this.setVueParse('Base');
    this.renderBox();
    this.render();
  }
  

  public getFragment(index: number): any {
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
      this.$fragment = cheerio.load(`
        <div class="box">
          <${this.fileName} />
        </div>`, {
        xmlMode: true,
        decodeEntities: false
      });
  
      this.$blockTemplate = cheerio.load(templateStr, {
        xmlMode: true,
        decodeEntities: false
      });
  
    } else {
      this.$fragment = cheerio.load(`<${this.fileName} />`, {
        xmlMode: true,
        decodeEntities: false
      });
      this.$blockTemplate = cheerio.load(`
        <template>
          <div class="root">
            <el-table
              border
              style="width: 100%"
              :data="tableData">
            </el-table>
            <div class="other"></div>
          </div>
        </template>
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

  public addComponent (data?: any) {
    const { key,type, params, cellParams } = data;
    let dynamicObj = null;
    if (!this.components[params.uuid]) {
      this.components[params.uuid] = [];
    }
    if(type === 'box') {
      const box = new Box();
      data.displayMode = 'table';
      box.addComponent(data);
      this.components[params.uuid].push(box);
    } else {
      dynamicObj = require(`../../component/Table/${key}`).default;
      
      this.components[params.uuid].push(new dynamicObj(type, cellParams))
    }
  }


  public changePosition (order: any) {
    let uuid = this.findComponents(order[0]);
    if (!uuid) {
      return {
        status: 1,
        message: '暂不支持拖拽'
      }
    }

    const components = order.reduce((total, key)=> {
      total.push(this.components[uuid].find(comp => comp.uuid === key));
      return total;
    }, []);

    this.components[uuid] = components;

    this.resetRender();
    this.observeComp();
  }

  public findComponents (uuid: string) {
    let temp = null;
    Object
    .keys(this.components)
    .forEach(key => {
      const comp = this.components[key].find(item => item.uuid === uuid);
      if (comp) {
        temp = key;
      }
    });
    return temp;
  }

  public setVueParse (compName: string) {
    const uuidValue = uuid().split('-')[0]; 
    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'box/table',`${compName}.vue`), 'utf8');
    this.vueParseMap[compName] =  new VueParse(uuidValue, fileStr);
  }
  public async setting (data: any) {
    const {handler} = data;
    if (this[handler]) {
      await this[handler](data);
      this.renderBox();
    }
    this.render();
  }
  
  private setHeaderData (data) {
    const list = data.code.map(item => {
      if (!item.uuid) {
        item.uuid = uuid().split('-')[0];
      }
      return item;
    });
    this.tableHeaderData = list;
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
    this.settingData.headerData = JSON.stringify(this.tableHeaderData);
    return {
      data: this.settingData
    }
  }

  public renderBox () {
    this.renderStep = !this.renderStep;
    this.$blockTemplate('el-table').empty();
    this.$blockTemplate('.other').empty();
    this.$blockTemplate('el-table').append(this.renderColumn());
    this.$blockTemplate('.other').append(this.boxStrs);
    this.vueParseMap['Base'] && this.VueGenerator.appendData(this.vueParseMap['Base'].data)
  }

  public renderColumn () {
    let column = ''
    const type = this.storage.get('preview_view_status') || 0;

    const {tableHeaderData} = this;
    this.boxStrs = '';

    const fn = (components) => {
      components.forEach(item => {
        if (item.vueParse && item.insertFileType === 'inline') {
          item.vueParse.methods && this.VueGenerator.appendMethods(item.vueParse.methods);
          item.vueParse.data && this.VueGenerator.appendData(item.vueParse.data);
        }
        if (item.insertComponents && item.insertComponents.length) {
          this.VueGenerator.appendComponent(upperCamelCase(item.insertComponents[0]), true);
        }
        if (item.insertFileType !== 'block' && item.components && item.components.length > 0) {
          fn(item.components)
        }
      })
    }

    for (var i = 0; i < tableHeaderData.length; i++) {
      const uuid = tableHeaderData[i].uuid;
      let compTag = this.renderStep ? '<div />' : '';
      if (this.components[uuid]) {
        this.components[uuid].forEach(item => {
          if (item.name === 'box') {
            this.boxStrs = this.boxStrs + item.getFragment().html();
            const fragmentOther = item.getFragmentOther();
            if (fragmentOther) {
              compTag = compTag +  fragmentOther.html();
            }
          } else {
            compTag = compTag + `${item.getFragment().html()}`;
          }
        })
        fn(this.components[uuid]);
      }



      const curProp = tableHeaderData[i].prop ? `prop="${tableHeaderData[i].prop}"` : '';
      let cellBox = '';
      if (type === 0) {
        cellBox = !curProp ? `
          <template slot-scope="{row, column, $index}">
            
            ${compTag}
            <table-cell-box uuid="${tableHeaderData[i].uuid}"></table-cell-box>
          </template>
        ` : '';

        column += `
          <el-table-column 
            ${curProp} 
            label="${tableHeaderData[i].label}"
          >
            <template slot="header" slot-scope="{row, column, $index}">
              <table-header-box uuid="${tableHeaderData[i].uuid}" :label="column.label"></table-header-box>
            </template>
            ${cellBox}
          </el-table-column>
        `;
      } else {
        cellBox = !curProp && compTag ? `
          <template slot-scope="{row, column, $index}">
            ${compTag}
          </template>
        ` : '';

        column += `
        <el-table-column 
          ${curProp}
          label="${tableHeaderData[i].label}"
        >
          ${cellBox}
        </el-table-column>
      `;
      }
    
    }
    return column;
  }
  

  public render () {
    const template = `${this.$blockTemplate.html()}\n<script>${generate(this.VueGenerator.pageAST).code}</script>`;

    const formatTemp = prettier.format(template, { semi: true, parser: "vue" });
    fsExtra.writeFileSync(this.blockPath, formatTemp, 'utf8');
  }

  setTemplate () {

  }
}