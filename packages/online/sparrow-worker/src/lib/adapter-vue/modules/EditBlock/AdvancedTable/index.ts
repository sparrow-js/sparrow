import * as cheerio from 'cheerio';
import VueParse from '../../generator/VueParse';
import Base from '../BaseEditBlock'
import Config from '../../../config';
import Template from './template';

export default class AdvancedTable extends Base{
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
    this.vueParse = new VueParse(this.uuid, Template.code);
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