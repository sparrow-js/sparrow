import * as cheerio from 'cheerio';
import storage from '../../../storage';
const uuid = require('@lukeed/uuid');

export default class Common {
  $fragment: any;
  uuid: string = '';
  config: any = {};
  _attrStr: string = '';
  storage: any = {};
  name: string = '';
  widgetType: string = 'custom';

  
  constructor () {
    this.uuid = uuid().split('-')[0]; 
    this.storage = storage;
  }
  public getConfig () {
    return this.config;
  }

  public renderFragment () {
    this.$fragment = cheerio.load(this.fragment(), {
      xmlMode: true,
      decodeEntities: false,
    });

    const type = storage.get('preview_view_status') || 0;
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