
import * as cheerio from 'cheerio';
const uuid = require('@lukeed/uuid');

export default class Typography{
  name: string = 'Button';
  config: any = {};
  uuid: string = '';
  $fragment: any;

  constructor (params: any) {
    this.uuid = uuid().split('-')[0];
    this.$fragment = cheerio.load(`
      <el-button type="primary">主要按钮</el-button>
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