
import * as cheerio from 'cheerio';
import Common from '../Common';
import * as _ from 'lodash';

const uuid = require('@lukeed/uuid');

export default class EditText extends Common{
  name: string = 'EditText';
  config: any = {};
  $fragment: any;
  forceRefresh: Boolean = false;

  constructor (params: any) {
    super();
    const {initType} = params;
    if (initType === 'auto' ) {
      this.config = _.cloneDeep(params);
    } else {
      this.config = _.cloneDeep(require('./config'));
    }
    this.setAttrsToStr();
  }

  public insertEditText (params) {
    this.config.model.custom.label = params.value;
  }

  customAttrHandler () {
    this.forceRefresh = !this.forceRefresh;
  }

  public wrapComponentBox (content) {
    const type = this.storage.get('preview_view_status').value() || 0;
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

    const type = this.storage.get('preview_view_status').value() || 0;

    let value = _.get(this.config, 'model.custom.value') || '';
    if (value) {
      value = `{{ ${value} }}`;
    } else {
      value = this.config.model.custom.label;
    }

    let typography = '';
    if (type === 0) {
      typography = `
        <edit-text-box :clearClass="true" uuid="${this.uuid}" ${this._attrStr}>
          ${this.forceRefresh ? '<div />' : ''}
          ${value}
        </edit-text-box>
      `
    } else {
      const inline = _.get(this.config, 'model.custom.inline');
      if (inline) {
        typography = `
          <span ${this._attrStr}>${value}</span>
        `;
      } else {
        typography = `
          <div ${this._attrStr}>${value}</div>
        `;
      }

    }
    return typography;
  }
}