import * as cheerio from 'cheerio';
import lowdb from '../../../lowdb';
import { v4 as uuid } from '@lukeed/uuid';

export default class Common {
  $fragment: any;
  uuid: string = '';
  config: any = {};
  _attrStr: string = '';
  name: string = '';
  widgetType: string = 'EditBlock';
  
  constructor () {
    this.uuid = uuid().split('-')[0]; 
  }
  public getConfig () {
    return this.config;
  }

  public renderFragment () {
    this.$fragment = cheerio.load(this.fragment(), {
      xmlMode: true,
      decodeEntities: false,
    });

    const type = lowdb.get('preview_view_status').value() || 0;
    if (type === 0) {
      this.$fragment.root().children().attr('data-design-mode', 'design-border');
      this.$fragment.root().children().attr('data-instance-name', this.name);
      this.$fragment.root().children().attr('data-id', this.uuid);
      this.$fragment.root().children().attr('data-type', 'component');
    }
  }

  public fragment () {
    return '';
  }

  public settingConfig (config: any) {
    this.config = config;
    this.setAttrsToStr();
  }


  public setAttrsToStr () {
    const {config} = this;
    if (config.model.attr) {
      const formField = [];
      Object.keys(config.model.attr).forEach(key => {
        if (key === 'v-model' && !config.model.attr[key]) {
          return;
        }
        formField.push(`${key}="${config.model.attr[key]}"`);
      });
      this._attrStr = formField.join(' ');
    }
  }

  public getFragment () {
    this.renderFragment();
    return this.$fragment;
  }
}