import * as cheerio from 'cheerio';
const uuid = require('@lukeed/uuid');


export default class Base {
  public type = 'form';
  public $fragment: any;
  public labelValue = '';
  public uuid = '';
  public config: any = {};
  public _attrStr: string = '';
  public _formItemStr: string = '';
  public insertFileType = 'inline';

  constructor () {
    this.uuid = uuid().split('-')[0]; 
  }

  public renderFragment () {
    this.$fragment = cheerio.load(this.fragment(), {
      xmlMode: true,
      decodeEntities: false,
    });
  }

  public fragment () {
    return '';
  }

  public getFragment (type: number) {
    this.renderFragment();

    if (type === 1) {
      this.$fragment('label-box').remove();
      this.$fragment('el-form-item').attr('label', this.config._attr.label);
    }
    return this.$fragment;
  }

  public setLabel(labelValue: string) {
    this.config._custom.label = labelValue
  }

  public getConfig() {
    return this.config
  }

  protected setHandler () {}

  public setConfig (config: any) {
    this.config = config;
    this.setHandler();
  }

  public setAttrsToStr () {
    const {config} = this;
    if (config._attr) {
      const formField = [];
      Object.keys(config._attr).forEach(key => {
        formField.push(`${key}="${config._attr[key]}"`);
      });
      this._attrStr = formField.join(' ');
    }
  }

  public removeAttr (attr: string) {
    this.$fragment.root().children().removeAttr(attr);
  }

}