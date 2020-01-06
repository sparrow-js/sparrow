import IBaseBox from './IBaseBox';
import * as cheerio from 'cheerio';
import * as boxFragment from '../fragment/box'

export default class Layout implements IBaseBox{
  $fragment: any;
  components: any = {};

  constructor (data: any) {
    const { boxIndex, params } = data;
    this.$fragment = cheerio.load(boxFragment.box(boxIndex), {
      xmlMode: true,
      decodeEntities: false
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
    /**
      {
        boxData: { type: 'layout', params: { row: 0, col: 0 } },
        key: 'Placeholder',
        name: 'name'
      }
    */
    const { key, boxData, name } = data;
    const { params } = boxData;
    const dynamicObj = require(`../component/${key}`).default;
    const componentKey = `${params.row}_${params.col}`
    this.components[componentKey] = new dynamicObj({
      'slot': componentKey,
    });
    this.render();
  } 

  public getBoxFragment(): any {
    return this.$fragment;
  }

  render () {
    this.$fragment('layout').empty();
    Object
      .keys(this.components)
      .forEach(item => {
        const component = this.components[item];
        this.$fragment('layout').append(component.getFragment().html());
      });
  }
}