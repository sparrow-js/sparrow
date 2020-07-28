import * as cheerio from 'cheerio';
const uuid = require('@lukeed/uuid');


export default class Base {
  public type = 'table';
  public $fragment: any;
  public uuid = '';
  public insertFileType = 'inline';


  constructor () {
    this.uuid = uuid().split('-')[0]; 
  }

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

  public removeAttr (attr: string) {
    this.$fragment.root().children().removeAttr(attr);
  }

}