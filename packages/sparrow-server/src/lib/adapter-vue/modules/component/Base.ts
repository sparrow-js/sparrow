import * as cheerio from 'cheerio';
const uuid = require('@lukeed/uuid');


export default class Base {
  public type = 'form';
  public $fragment: any;
  public componentIndex = -1;
  public labelValue = '';
  public attrs = {};
  public uuid = '';
  public config: any = {};

  constructor (attrs: any, componentIndex: number) {
    this.componentIndex = componentIndex;
    this.attrs = attrs;
    this.uuid = uuid().split('-')[0]; 
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

  public getFragment (type: number) {
    this.renderFragment();
    if (type === 1) {
      this.$fragment('label-box').remove();
      this.$fragment('el-form-item').attr('label', this.labelValue);
    }
    return this.$fragment;
  }

  public setLabel(labelValue: string) {
    this.labelValue = labelValue;
  }

  public getConfig() {
    return this.config
  }

  protected setHandler () {}

  public setConfig (config: any) {
    this.config = config;
    this.setHandler();
  }

  public removeAttr (attr: string) {
    this.$fragment.root().children().removeAttr(attr);
  }

}