import * as fsExtra from 'fs-extra';
import * as cheerio from 'cheerio';
import VueParse from '../../generator/VueParse';
import * as path from 'path';
import Base from '../BaseEditBlock'
import Config from '../../../config';

export default class ComplexTable extends Base{
  name: string = 'ComplexTable';
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
    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'EditBlock/ComplexTable', 'index.vue'), 'utf8');
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