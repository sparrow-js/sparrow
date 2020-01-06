import IBaseBox from './IBaseBox';
import * as cheerio from 'cheerio';
import * as boxFragment from '../fragment/box'
import components from '../fragment/scene/components'

export default class Layout implements IBaseBox{
  $fragment: any;

  constructor (data: any) {
    const { boxIndex, params } = data;
    this.$fragment = cheerio.load(boxFragment.box(boxIndex), {
      xmlMode: true
    });

    const layoutFragment = boxFragment.layout(params.col, params.row);
    const eform = boxFragment.eform(layoutFragment)
    if (params.isForm) {
      this.$fragment('box').append(eform);
    } else {
      this.$fragment('box').append(layoutFragment);
    }
  }
  
  addComponent (data: any) {
    const fragment = components[data.key].fragment();
  } 

  public getBoxFragment(): any {
    return this.$fragment;
  }
}