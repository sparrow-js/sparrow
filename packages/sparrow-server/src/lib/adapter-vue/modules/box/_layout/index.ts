import IBaseBox from '../IBaseBox';
import * as cheerio from 'cheerio';
import * as boxFragment from '../../fragment/box';
import * as fragment from './fragment';
import Base from '../Base';


export default class Layout extends Base implements IBaseBox{
  $fragment: any;
  components: any = {};
  template: string;
  params: any;

  constructor (data: any) {
    super();
    const { boxIndex, params } = data;
    this.params = params;
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
    const { key, boxData, name } = data;
    const { params } = boxData;
    const dynamicObj = require(`../../component/${key}`).default;
    const componentKey = `${params.row}_${params.col}`
    this.components[componentKey] = new dynamicObj({
      'slot': componentKey,
    });
    this.render();
  } 

  public getFragment(index: number): any {
    this.$fragment('box').attr(':index', index);
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
    this.setTemplate();
  }

  setTemplate () {
    let template = '';
    const componentKeys = Object.keys(this.components);
    const {col, isForm} = this.params;
    const colSpan = 24 / col;
    componentKeys.forEach(item => {
      const component = this.components[item];
      const cloneComp = component.getFragment().html();
      const $comp = cheerio.load(cloneComp, {
        xmlMode: true,
        decodeEntities: false
      });
      $comp.root().children().removeAttr('slot')
      template += fragment.col(colSpan, $comp.html());
    });
    if (template) {
      fragment.row(this.template);
    }

    if (isForm && template) {
      template = boxFragment.eform(template)
    }
    this.template = template;
  }

  public getSetting () {
    return {}
  }
}