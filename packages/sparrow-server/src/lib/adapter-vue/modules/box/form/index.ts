import IBaseBox from '../IBaseBox';
import * as boxFragment from '../../fragment/box';
import * as fragment from './fragment';
import * as fsExtra from 'fs-extra';
import * as path from 'path';
import * as cheerio from 'cheerio';
import * as mkdirp from 'mkdirp';
import * as util from 'util';
import Config from '../../../config';

const mkdirpAsync = util.promisify(mkdirp);


export default class Form implements IBaseBox{
  $fragment: any;
  template: string;

  constructor (data: any) {
    const { boxIndex, params } = data;
    this.$fragment = cheerio.load(boxFragment.box(boxIndex), {
      xmlMode: true,
      decodeEntities: false
    });
    this.init();
  }

  async init () {
    const form = boxFragment.eform();
    const boxForm = fragment.BoxForm(form);
    this.$fragment('box').append(boxForm);
    await mkdirpAsync(Config.componentsDir);
    const viewPath = path.join(Config.componentsDir, 'form11.vue');
    fsExtra.writeFile(viewPath, '<tempate></template>', 'utf8')
  }

  public getBoxFragment(index: number): any {
    return this.$fragment;
  }

  public addComponent (data: any) {

  }

  public render () {
    
  }

  setTemplate () {

  }
}