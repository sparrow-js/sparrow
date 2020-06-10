import IBaseBox from '../IBaseBox';
import * as boxFragment from '../../fragment/box';
import * as cheerio from 'cheerio';
import Base from '../Base';

export interface IFormSetting{
  dataCode: string;
  inline: boolean;
}

export default class Inline  extends Base implements IBaseBox{
  name: string = 'Inline';
  $fragment: any;
  type:number = 0;
  boxIndex: number;
  innerHtml: string;

  constructor (data: any) {
    super();
    const { boxIndex, innerHtml } = data;
    this.boxIndex = boxIndex;
    this.innerHtml = innerHtml;

    this.$fragment = cheerio.load(boxFragment.box(boxIndex, innerHtml), {
      xmlMode: true,
      decodeEntities: false
    });
  }

  public getFragment(index: number): any {
    return this.$fragment;
  }

  public setPreview (type: number = 0) {
    if (this.type === type) {
      return;
    } else {
      this.type = type;
    }
    if (type === 0) {
      this.$fragment = cheerio.load(boxFragment.box(this.boxIndex, this.innerHtml), {
        xmlMode: true,
        decodeEntities: false
      });
    } else {
      this.$fragment = cheerio.load(this.innerHtml, {
        xmlMode: true,
        decodeEntities: false
      });  
    }
  }

  getSetting () {}

  setTemplate () {

  }
}