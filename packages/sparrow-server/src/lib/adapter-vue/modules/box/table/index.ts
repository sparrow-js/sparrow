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
import VueParse from '../../generator/VueParse';
const uuid = require('@lukeed/uuid');

const mkdirpAsync = util.promisify(mkdirp);

const templateStr =  `
  <template>
    <div class="root">
      <table-box>
        <el-table
          border
          style="width: 100%">
        </el-table>
      </table-box>
    </div>
  </template>
`;
export interface IFormSetting{
  dataCode: string;
  inline: boolean;
}

export default class Form implements IBaseBox{
  $fragment: any;
  template: string;
  name: string;
  VueGenerator: any;
  blockPath: string;
  insertComponents:string[] = [];
  components: any = [];
  $blockTemplate: any;
  activeIndex: number = -1;

  data: any = {};
  methods: any = {};
  vueParseMap:any = {};

  settingData: IFormSetting = {
    dataCode: `var data = {}`,
    inline: false
  }

  constructor (data: any) {
    const { boxIndex, params } = data;
    const {blockName} = params;
    this.name = blockName;
    this.insertComponents.push(this.name);
    this.$fragment = cheerio.load(boxFragment.box(boxIndex, `<${this.name} />`), {
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
    console.log('****************')

    this.setVueParse('Base');
    this.renderBox();
    this.render();
  }
  

  public getBoxFragment(index: number): any {
    return this.$fragment;
  }

  public setVueParse (compName: string) {
    const uuidValue = uuid().split('-')[0]; 
    const fileStr = fsExtra.readFileSync(path.join(__dirname, `${compName}.vue`), 'utf8');
    console.log('*******11111*****', fileStr); 
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

  private setActiveIndex (data) {
    this.activeIndex = parseInt(data.index, 10);
  }
  
  public getSetting () {
    return {
      data: this.settingData
    }
  }

  public renderBox () {
    this.$blockTemplate('el-table').empty();
    this.$blockTemplate('el-table').append(this.renderColumn());
    console.log('*******',this.$blockTemplate.html());
    // this.VueGenerator.appendData(component.vueParse.data)
    console.log('****************', this.vueParseMap['Base']);

    this.VueGenerator.appendMethods(this.vueParseMap['Base'].methods);
    /**
     * <el-table-column prop="date" label="日期" width="180" :render-header="renderHeader">
        </el-table-column>
     */
  }

  public renderColumn () {
    let column = ''
    for (var i = 0; i < 4;i++) {
      column += `
        <el-table-column prop="date" label="日期" width="180" :render-header="renderHeader">
        </el-table-column>
      `
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