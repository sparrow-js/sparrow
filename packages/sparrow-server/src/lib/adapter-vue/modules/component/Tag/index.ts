
import * as cheerio from 'cheerio';
const uuid = require('@lukeed/uuid');

export default class Tag{
  name: string = 'Tag';
  config: any = {};
  uuid: string = '';
  $fragment: any;

  constructor (params: any) {
    this.uuid = uuid().split('-')[0];
    this.$fragment = cheerio.load(`
      <el-tag>标签</el-tag>
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