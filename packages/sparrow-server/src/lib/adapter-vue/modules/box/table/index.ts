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
const uuid = require('@lukeed/uuid');

const mkdirpAsync = util.promisify(mkdirp);

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
    </div>
  </template>
`;
export interface IFormSetting{
  headerData: string;
}

export default class Table implements IBaseBox{
  $fragment: any;
  template: string;
  name: string;
  VueGenerator: any;
  blockPath: string;
  insertComponents:string[] = [];
  components: any = {};
  $blockTemplate: any;
  activeIndex: number = -1;
  col: number = 2;
  tableHeaderData: any =  [];

  data: any = {};
  methods: any = {};
  vueParseMap:any = {};

  settingData: IFormSetting = {
    headerData: ``,
  }

  constructor (data: any) {
    const { boxIndex, params } = data;
    const {blockName, col} = params;
    this.name = blockName;
    this.col = col;
    for (let i = 0; i < this.col; i++) {
      this.tableHeaderData.push({
        uuid: uuid().split('-')[0],
        label: '',
      });
    }
    this.insertComponents.push(this.name);
    this.$fragment = cheerio.load(boxFragment.box(boxIndex, `<${this.name} />`, '表格'), {
      xmlMode: true,
      decodeEntities: false
    });

    this.$blockTemplate = cheerio.load(templateStr, {
      xmlMode: true,
      decodeEntities: false
    });

    this.VueGenerator = new VueGenerator('block');
    this.init();
    this.VueGenerator.appendData();
  }

  async init () {
    await mkdirpAsync(Config.componentsDir);
    this.blockPath = path.join(Config.componentsDir, `${this.name}.vue`);
    this.setVueParse('Base');
    this.renderBox();
    this.render();
  }
  

  public getBoxFragment(index: number): any {
    return this.$fragment;
  }

  public addComponent (data: any) {
    const { key,type, params } = data;
    const dynamicObj = require(`../../component/Table/${key}`).default;
    if (!this.components[params.uuid]) {
      this.components[params.uuid] = [];
    }
    this.components[params.uuid].push(new dynamicObj(type))
    this.renderBox();
    this.render();
  }

  public setVueParse (compName: string) {
    const uuidValue = uuid().split('-')[0]; 
    const fileStr = fsExtra.readFileSync(path.join(__dirname, `${compName}.vue`), 'utf8');
    this.vueParseMap[compName] =  new VueParse(uuidValue, fileStr);
  }
  public setting (data: any) {
    const {handler} = data;
    if (this[handler]) {
      this[handler](data);
      this.renderBox();
    }
    this.render();
  }
  
  private setHeaderData (data) {

    this.tableHeaderData = data.code;
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
    this.$blockTemplate('el-table').empty();
    this.$blockTemplate('el-table').append(this.renderColumn());
    this.VueGenerator.appendData(this.vueParseMap['Base'].data)
  }

  public renderColumn () {
    let column = ''
    const {tableHeaderData} = this;
    for (var i = 0; i < tableHeaderData.length; i++) {
      const uuid = tableHeaderData[i].uuid;
      let compTag = ''
      if (this.components[uuid]) {
        this.components[uuid].forEach(item => {
          compTag = item.getFragment().html() + compTag;
          if (item.vueParse && item.vueParse.methods) {
            this.VueGenerator.appendMethods(item.vueParse.methods);
          }
        })
      }

      column += `
        <el-table-column prop="${tableHeaderData[i].prop}" label="${tableHeaderData[i].label}">
          <template slot="header" slot-scope="{row, column, $index}">
            <table-header-box uuid="${tableHeaderData[i].uuid}" :label="column.label"></table-header-box>
          </template>
          <template slot-scope="{row, column, $index}">
            ${compTag}
            <table-cell-box uuid="${tableHeaderData[i].uuid}"></table-cell-box>
          </template>
        </el-table-column>
      `;
    }
    return column;
  }
  

  public render () {
    const template = `${this.$blockTemplate.html()}\n<script>${generate(this.VueGenerator.pageAST).code}</script>`;
    const formatTemp = prettier.format(template, { semi: true, parser: "vue" });

    fsExtra.writeFile(this.blockPath, formatTemp, 'utf8');
  }

  setTemplate () {

  }
}