import * as cheerio from 'cheerio';
import VueParse from '../../generator/VueParse';
import Base from '../BaseEditBlock'
import Template from './template';

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