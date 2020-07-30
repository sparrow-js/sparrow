import * as cheerio from 'cheerio';
const uuid = require('@lukeed/uuid');

export default class Common {
  $fragment: any;
  uuid: string = '';
  
  constructor () {
    this.uuid = uuid().split('-')[0]; 
  }
  public getConfig () {}

  public renderFragment () {
    this.$fragment = cheerio.load(this.fragment(), {
      xmlMode: true,
      decodeEntities: false,
    });
  }

  public fragment () {
    return '';
  }

  public getFragment () {
    this.renderFragment();
    return this.$fragment;
  }
}