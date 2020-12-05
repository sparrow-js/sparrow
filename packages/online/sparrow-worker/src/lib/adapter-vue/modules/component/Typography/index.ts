
import * as cheerio from 'cheerio';
import Common from '../Common';
import * as _ from 'lodash';
const uuid = require('@lukeed/uuid');

export default class Typography extends Common{
  name: string = 'Typography';
  config: any = {};
  $fragment: any;

  constructor (params: any) {
    super();

    if (params.initType === 'auto') {
      this.config = params;
    } else {
      this.config = _.cloneDeep(require('./config'));
      this.config.model.custom.type = params.type;
    }
    this.setAttrsToStr();
  }

  private wrapEditText (content) {
    const type = this.storage.get('preview_view_status') || 0;
    if (type === 0) {
      return `
        <edit-text-box :clearClass="true" uuid="${this.uuid}">
          ${content}
        </edit-text-box>
      `
    } else {
      return content;
    }

  }

  public fragment () {
    let typography = '';
    const label = _.get(this.config, 'model.custom.label');
    const classS =  _.get(this.config, 'model.custom.class');
    switch (this.config.model.custom.type) {
      case 'H1':
        typography = `
        <h1 class="s-typography ${classS}" ${this._attrStr}>
          ${this.wrapEditText(label)}
        </h1>`;
        break;
      case 'H2':
        typography = `
        <h2 class="s-typography ${classS}" ${this._attrStr}>
          ${this.wrapEditText(label)}
        </h2>`;
        break;
      case 'H3':
        typography = `
        <h3 class="s-typography ${classS}" ${this._attrStr}>
          ${this.wrapEditText(label)}
        </h3>`;
        break;
      case 'H4':
        typography = `
        <h4 class="s-typography ${classS}" ${this._attrStr}>
          ${this.wrapEditText(label)}
        </h4>`;
        break;
      case 'Text':
        typography = `
        <p class="s-typography ${classS}" ${this._attrStr}>
          ${this.wrapEditText(label)}
        </p>`;
        break;
      case 'AText':
        typography = `
        <p class="s-typography minor-typography ${classS}" ${this._attrStr}>
          ${this.wrapEditText(label)}
        </p>`;
        break;    
      default:
        break;  
    }
    return typography;
  }

  public insertEditText (params) {
    this.config.model.custom.label = params.value;
  }

}