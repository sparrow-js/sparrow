
import IBaseBox from './IBaseBox';
import * as cheerio from 'cheerio';
import * as boxFragment from '../fragment/box'

export default class Block implements IBaseBox{
  $fragment: any;

  constructor (data: any) {
    const { boxIndex, params } = data;
    this.$fragment = cheerio.load(boxFragment.box(boxIndex), {
      xmlMode: true,
      decodeEntities: false
    });
    this.$fragment('box').append(boxFragment.block());
  }

  public getBoxFragment(): any {
    return this.$fragment;
  }

  public addBlock (data: any) {
    console.log(data);
    console.log('**************')
  }
  render () {
    this.$fragment('layout').empty();
  }
}