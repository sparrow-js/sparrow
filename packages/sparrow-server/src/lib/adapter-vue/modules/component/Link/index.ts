
import * as cheerio from 'cheerio';
const uuid = require('@lukeed/uuid');

export default class Link{
  name: string = 'Link';
  config: any = {};
  uuid: string = '';
  $fragment: any;

  constructor (params: any) {
    this.uuid = uuid().split('-')[0];
    this.$fragment = cheerio.load(`
      <el-link type="primary">主要链接</el-link>
    `, {
      xmlMode: true,
      decodeEntities: false,
    });
  }

  getConfig () {
    return {};
  }


  public getFragment () {
    return this.$fragment;
  }
}