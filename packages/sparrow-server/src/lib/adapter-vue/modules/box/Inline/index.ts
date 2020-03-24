import IBaseBox from '../IBaseBox';
import * as boxFragment from '../../fragment/box';
import * as cheerio from 'cheerio';

export interface IFormSetting{
  dataCode: string;
  inline: boolean;
}

export default class Form implements IBaseBox{
  $fragment: any;

  constructor (data: any) {
    const { boxIndex, innerHtml } = data;

    this.$fragment = cheerio.load(boxFragment.box(boxIndex, innerHtml), {
      xmlMode: true,
      decodeEntities: false
    });

  }

  public getBoxFragment(index: number): any {
    return this.$fragment;
  }

  setTemplate () {

  }
}