import * as cheerio from 'cheerio';
import lowdb from '../../../lowdb';
import { v4 as uuid } from '@lukeed/uuid';



export default class Common {
  public $fragment: any;
  public labelValue = '';
  public uuid = '';
  public config: any = {};
  public storage: any = null; 
  public _attrStr: string = '';
  public isInline: boolean = false;
  public name: string = '';
  public widgetType: string = 'component';

  constructor () {
    this.uuid = uuid().split('-')[0]; 
    this.storage = lowdb;
  }

  public renderFragment () {
    this.$fragment = cheerio.load(this.fragment(), {
      xmlMode: true,
      decodeEntities: false,
    });
    const type = this.storage.get('preview_view_status').value() || 0;
    if (type === 0) {
      this.$fragment.root().children().attr('data-design-mode', 'design-border-component');
      this.$fragment.root().children().attr('data-instance-name', this.name);
      this.$fragment.root().children().attr('data-id', this.uuid);
      this.$fragment.root().children().attr('data-type', 'component');
    }
  }

  public fragment () {
    return '';
  }

  public getFragment (type: number) {
    this.renderFragment();
    return this.$fragment;
  }

  public getConfig() {
    return this.config
  }


  public setAttrsToStr () {
    const {config} = this;
    if (config.model.attr) {
      const formField = [];
      Object.keys(config.model.attr).forEach(key => {
        const value = config.model.attr[key];
        if(value) {
          formField.push(`${key}="${value}"`);
        }
      });
      this._attrStr = formField.join(' ');
    }
    console.log(this._attrStr);
  }

  public customAttrHandler () {}

  public settingConfig (config: any) {
    this.config = config;
    this.customAttrHandler();
    this.setAttrsToStr();
  }

}