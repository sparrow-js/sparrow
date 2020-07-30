import * as cheerio from 'cheerio';
import Common from '../Common';


export default class Base extends Common{
  public type = 'table';
  public $fragment: any;
  public insertFileType = 'inline';
  
  constructor () {
    super();
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