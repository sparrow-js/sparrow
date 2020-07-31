import * as cheerio from 'cheerio';
import storage from '../../../storage';
const uuid = require('@lukeed/uuid');

export default class Common {
  $fragment: any;
  uuid: string = '';
  
  constructor () {
    this.uuid = uuid().split('-')[0]; 
  }
  public getConfig () {}

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

  public getFragment () {
    this.renderFragment();
    return this.$fragment;
  }
}