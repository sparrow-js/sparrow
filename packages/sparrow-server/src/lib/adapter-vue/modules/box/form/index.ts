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

const mkdirpAsync = util.promisify(mkdirp);

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

    this.$blockTemplate('box-form').append(fragment.eform());
    this.VueGenerator = new VueGenerator('block');
    this.init();
    this.VueGenerator.appendData();
  }

  async init () {
    await mkdirpAsync(Config.componentsDir);
    this.blockPath = path.join(Config.componentsDir, `${this.name}.vue`);
    this.render();
  }

  public getBoxFragment(index: number): any {
    return this.$fragment;
  }

  public addComponent (data: any) {
    // { boxData: { type: 'form' }, key: 'BaseInput', name: 'form.id' }
    const { key, boxData, name } = data;
    const { params } = boxData;
    const dynamicObj = require(`../../component/${key}`).default;
    

    const componentIndex = this.components.length;
    this.components.push(new dynamicObj({
      'v-model': name,
    }, componentIndex));
    this.renderBox();
    this.render();
  } 


  public setting (data: any) {
    console.log('*********8888*********');

    console.log(data);
    // { index: '0', value: '基础文本框', handler: 'addLabel' }
    const {handler} = data;
    // this.VueGenerator.
    if (handler === 'data') {
      this.settingData.dataCode = data.code;
      this.VueGenerator.appendData(this.settingData.dataCode);
    } else if (handler === 'formInline') {
      this.$blockTemplate('el-form').attr(data.key, data.value);
    } else if (handler === 'addLabel') {
      this.addlabel(data);
      this.renderBox();
    } else {
      if (this[handler]) {
        this[handler](data);
        this.renderBox();
      }
    }
    this.render();
  }

  private setActiveIndex (data) {
    this.activeIndex = parseInt(data.index, 10);
  }

  private addlabel (params: any) {
    this.components[params.index].setLabel(params.value);
  }
  
  public getSetting () {
    return {
      data: this.settingData
    }
  }

  public renderBox () {
    this.$blockTemplate('el-form').empty();
    this.components.forEach((component, index) => {
      let active = 'false';
      if (this.activeIndex === index) {
        active = 'true';
      }
      this.$blockTemplate('el-form').append(
        `<component-box :is-active="${active}" indexcomp="${index}">
          ${component.getFragment().html()}
        </component-box>`
      );
    });
  }

  public render () {
    const template = `${this.$blockTemplate.html()}\n<script>${generate(this.VueGenerator.pageAST).code}</script>`;
    const formatTemp = prettier.format(template, { semi: true, parser: "vue" });
    fsExtra.writeFile(this.blockPath, formatTemp, 'utf8');
  }

  setTemplate () {

  }
}