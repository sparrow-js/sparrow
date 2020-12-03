import * as fsExtra from 'fs-extra';
import * as cheerio from 'cheerio';
import VueParse from '../../generator/VueParse';
import * as path from 'path';
import BaseEditBlock from '../BaseEditBlock'
import Config from '../../../config';

export default class AdvancedTable extends BaseEditBlock{
  name: string = 'AdvancedTable';
  params: any;
  vueParse: any;
  uuid: string;
  type: string;
  config: any;
  components: any = [];

  constructor (params: any = {}, storage) {
    super(storage);
    this.init();
  }

  public addComponent () {}

  private init () {
    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'EditBlock/AdvancedTable', 'index.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr);
  }

  public setPreview () {
    this.$fragment = cheerio.load( `
    <div></div>
  `, {
      xmlMode: true,
      decodeEntities: false,
    });
  }
}