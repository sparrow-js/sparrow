
import * as cheerio from 'cheerio';
const uuid = require('@lukeed/uuid');

export default class Icon{
  name: string = 'Icon';
  config: any = {};
  uuid: string = '';
  $fragment: any;

  constructor (params: any) {
    this.uuid = uuid().split('-')[0];
    this.$fragment = cheerio.load(`
      <i class="el-icon-question"></i>
    `, {
      xmlMode: true,
      decodeEntities: false,
    });
  }

  public getFragment () {
    return this.$fragment;
  }
}