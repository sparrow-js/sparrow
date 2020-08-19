import * as cheerio from 'cheerio';
import storage from '../../../storage';
const uuid = require('@lukeed/uuid');

export default class Common {
  $fragment: any;
  uuid: string = '';
  config: any = {};
  _attrStr: string = '';
  storage: any = {};
  
  constructor () {
    this.uuid = uuid().split('-')[0]; 
    this.storage = storage;
  }
  public getConfig () {
    return this.config;
  }

  public renderFragment () {
    let compBox = `
      <component-box uuid="${this.uuid}">
        ${this.fragment()}
      </component-box>
    `;

    const type = storage.get('preview_view_status') || 0;
    if (type) {
      compBox = this.fragment();
    }

    this.$fragment = cheerio.load(compBox, {
      xmlMode: true,
      decodeEntities: false,
    });
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