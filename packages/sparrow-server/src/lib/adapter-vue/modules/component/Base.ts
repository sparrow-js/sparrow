import * as cheerio from 'cheerio';

export default class Base {
  public type = 'form';
  public $fragment: any;
  public componentIndex = -1;
  public labelValue = '';
  public attrs = {};

  constructor (attrs: any, componentIndex: number) {
    this.componentIndex = componentIndex;
    this.attrs = attrs;
  }


  public renderFragment () {
    this.$fragment = cheerio.load(this.fragment(), {
      xmlMode: true,
      decodeEntities: false,
    });
    if (this.attrs) {
      Object
        .keys(this.attrs)
        .forEach(item => {
          this.$fragment('el-form-item').children().attr(item, this.attrs[item])
        })
    }
  }

  public fragment () {
    return '';
  }

  public getFragment () {
    this.renderFragment();
    return this.$fragment;
  }

  public setLabel(labelValue: string) {
    this.labelValue = labelValue;
  }

  public removeAttr (attr: string) {
    this.$fragment.root().children().removeAttr(attr);
  }

}