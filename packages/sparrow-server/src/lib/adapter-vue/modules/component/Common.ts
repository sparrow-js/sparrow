import * as cheerio from 'cheerio';
import storage from '../../../storage';


const uuid = require('@lukeed/uuid');


export default class Base {
  public $fragment: any;
  public labelValue = '';
  public uuid = '';
  public config: any = {};
  public storage: any = null; 

  constructor () {
    this.uuid = uuid().split('-')[0]; 
    this.storage = storage;
  }

  private wrapComponentBox (content) {
    const type = this.storage.get('preview_view_status') || 0;
    if (type === 0) {
      return `
        <component-box uuid="${this.uuid}">
          ${content}
        </component-box>
      `;
    } else {
      return content;
    }
  }

  public renderFragment () {
    this.$fragment = cheerio.load(this.wrapComponentBox(this.fragment()), {
      xmlMode: true,
      decodeEntities: false,
    });
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

  public settingConfig (config: any) {
    this.config = config;
  }

}