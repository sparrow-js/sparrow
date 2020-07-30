import * as cheerio from 'cheerio';
import Common from '../Common';

const uuid = require('@lukeed/uuid');


export default class Base extends Common{
  public type = 'table';
  public $fragment: any;
  public uuid = '';
  public insertFileType = 'inline';
  
  constructor () {
    super();
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
    console.log('******56******', this.$fragment.html());
    return this.$fragment;
  }

  public removeAttr (attr: string) {
    this.$fragment.root().children().removeAttr(attr);
  }

}