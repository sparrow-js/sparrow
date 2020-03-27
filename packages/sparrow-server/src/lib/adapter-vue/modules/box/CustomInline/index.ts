import IBaseBox from '../IBaseBox';
import * as boxFragment from '../../fragment/box';
import * as cheerio from 'cheerio';

export default class CustomInline implements IBaseBox{
  $fragment: any;
  components: any;

  constructor (data: any) {
    const { boxIndex, params } = data;
    this.$fragment = cheerio.load(boxFragment.box(boxIndex, `<custom-inline></custom-inline>`, '内联'), {
      xmlMode: true,
      decodeEntities: false
    });
  }

  public addComponent (data) {
    const { key, type } = data;
    const dynamicObj = require(`../../component/BasicTable/${key}`).default;
    this.components.push(new dynamicObj(type))
  }

  public getBoxFragment(index: number): any {
    return this.$fragment;
  }
}