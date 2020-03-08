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
    this.components.push(new dynamicObj({
      'v-model': name
    }));
    this.$blockTemplate('el-form').empty();
    this.components.forEach((component) => {
      this.$blockTemplate('el-form').append(component.getFragment().html());
    });
    this.render();
  } 


  public setting (data: any) {
    const {handler} = data;
    // this.VueGenerator.
    if (handler === 'data') {
      this.settingData.dataCode = data.code;
      this.VueGenerator.appendData(this.settingData.dataCode);
    } else if (handler === 'formInline') {
      this.$blockTemplate('el-form').attr(data.key, data.value);
    }
    this.render();
  }
  
  public getSetting () {
    return {
      data: this.settingData
    }
  } 

  public render () {
    const template = `${this.$blockTemplate.html()}\n<script>${generate(this.VueGenerator.pageAST).code}</script>`;
    const formatTemp = prettier.format(template, { semi: true, parser: "vue" });
    fsExtra.writeFile(this.blockPath, formatTemp, 'utf8');
  }

  setTemplate () {

  }
}