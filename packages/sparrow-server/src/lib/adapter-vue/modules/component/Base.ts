import * as cheerio from 'cheerio';

export default class Base {
  public type = 'form';
  public $fragment: any;
  public componentIndex = -1;

  constructor (attrs: any, componentIndex: number) {
    this.componentIndex = componentIndex;
    
    this.$fragment = cheerio.load(this.fragment(), {
      xmlMode: true,
      decodeEntities: false,
    });
    if (attrs) {
      Object
        .keys(attrs)
        .forEach(item => {
          this.$fragment('el-form-item').children().attr(item, attrs[item])
          // this.$fragment.root().children().attr(item, attrs[item]);
        })
    }
  }

  public fragment () {
    return '';
  }

  public getFragment () {
    return this.$fragment;
  }

  public removeAttr (attr: string) {
    this.$fragment.root().children().removeAttr(attr);
  }

}