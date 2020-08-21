
import * as cheerio from 'cheerio';
import Common from '../Common';
import * as _ from 'lodash';

const uuid = require('@lukeed/uuid');

export default class EditText extends Common{
  name: string = 'EditText';
  config: any = {};
  $fragment: any;

  constructor (params: any) {
    super();
    const {initType} = params;
    if (initType === 'auto' ) {
      this.config = _.cloneDeep(params);
    } else {
      this.config = _.cloneDeep(require('./config').default);
    }
    this.setAttrsToStr();
  }

  public insertEditText (params) {
    this.config.model.custom.label = params.value;
  }

  public wrapComponentBox (content) {
    const type = this.storage.get('preview_view_status') || 0;
    const inline = _.get(this.config, 'model.custom.inline');
    let inlineStr = '';
    if (inline) {
      inlineStr = `:is-inline="true"`;
    }
    if (type === 0) {
      return `
        <component-box ${inlineStr} uuid="${this.uuid}">
          ${content}
        </component-box>
      `;
    } else {
      return content;
    }
  }

  public fragment () {

    const type = this.storage.get('preview_view_status') || 0;
    let typography = '';
    if (type === 0) {
      typography = `
        <edit-text-box :clearClass="true" uuid="${this.uuid}" ${this._attrStr}>
          ${this.config.model.custom.label}
        </edit-text-box>
      `
    } else {
      const inline = _.get(this.config, 'model.custom.inline');
      if (inline) {
        typography = `
          <span ${this._attrStr}>${this.config.model.custom.label}</span>
        `;
      } else {
        typography = `
          <div ${this._attrStr}>${this.config.model.custom.label}</div>
        `;
      }

    }
    return typography;
  }
}