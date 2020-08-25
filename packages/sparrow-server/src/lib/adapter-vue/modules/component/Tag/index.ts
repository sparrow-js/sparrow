
import Common from '../Common'
import * as _ from 'lodash';

const uuid = require('@lukeed/uuid');

export default class Tag extends Common{
  name: string = 'Tag';
  config: any = {};
  $fragment: any;
  isInline: boolean = true; 

  constructor (params: any) {
    super();
    if (params.initType === 'auto') {
      this.config = params;
    } else {
      this.config = _.cloneDeep(require('./config').default);
    }
    this.setAttrsToStr();
  }


  getConfig () {
    return this.config;
  }

  public insertEditText (params) {
    this.config.model.custom.label = params.value;
  }

  public fragment () {
    const type = this.storage.get('preview_view_status') || 0;

    const value = _.get(this.config, 'model.custom.value') || '';
    const label = _.get(this.config, 'model.custom.label') || '';
    let text = '';
    if (value) {
      text = `{{${value}}}`
    } else {
      text = label;
    }

    let textBox = '';
    if (type === 0) {
      textBox = `<edit-text-box :clearClass="true" uuid="${this.uuid}">${text}</edit-text-box>`
    } else {
      textBox = text;
    }

    return `
      <el-tag ${this._attrStr}>
        ${textBox}
      </el-tag>
    `;
  }
}