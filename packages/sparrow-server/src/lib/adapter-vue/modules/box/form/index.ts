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
    <div class="root"></div>
  </template>
`;

export default class Form implements IBaseBox{
  $fragment: any;
  template: string;
  name: string;
  VueGenerator: any;
  blockPath: string;

  constructor (data: any) {
    const { boxIndex, params } = data;
    const {blockName} = params;
    this.name = blockName;
    this.$fragment = cheerio.load(boxFragment.box(boxIndex, `<${this.name} />`), {
      xmlMode: true,
      decodeEntities: false
    });
    this.VueGenerator = new VueGenerator('block');
    this.init();
  }

  async init () {
    const form = boxFragment.eform();
    const boxForm = fragment.BoxForm(form);
    this.$fragment('box').append(boxForm);
    await mkdirpAsync(Config.componentsDir);
    this.blockPath = path.join(Config.componentsDir, `${this.name}.vue`);
    this.render();
  }

  public getBoxFragment(index: number): any {
    return this.$fragment;
  }

  public addComponent (data: any) {
    fsExtra.writeFile(this.blockPath, templateStr, 'utf8');
  }

  public render () {
    const template = `${templateStr}\n<script>${generate(this.VueGenerator.pageAST).code}</script>`;
    const formatTemp = prettier.format(template, { semi: true, parser: "vue" });
    fsExtra.writeFile(this.blockPath, formatTemp, 'utf8');
  }

  setTemplate () {

  }
}