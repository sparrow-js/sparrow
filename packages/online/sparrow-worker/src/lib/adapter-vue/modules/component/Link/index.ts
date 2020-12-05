
import Common from '../Common';
import * as _ from 'lodash';

const uuid = require('@lukeed/uuid');

export default class Link extends Common{
  name: string = 'Link';
  config: any = {};
  $fragment: any;

  constructor (params: any) {
    super();
    this.config = _.cloneDeep(require('./config'));
    this.setAttrsToStr();
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
      <el-link type="primary">
        ${textBox}
      </el-link>
    `;
  }
}