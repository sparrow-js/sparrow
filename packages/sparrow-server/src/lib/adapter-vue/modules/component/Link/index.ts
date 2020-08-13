
import Common from '../Common';
import * as _ from 'lodash';

const uuid = require('@lukeed/uuid');

export default class Link extends Common{
  name: string = 'Link';
  config: any = {};
  $fragment: any;

  constructor (params: any) {
    super();
    this.config = _.cloneDeep(require('./config').default);
    this.setAttrsToStr();
  }

  public insertEditText (params) {
    this.config.model.custom.label = params.value;
  }

  public fragment () {
    const type = this.storage.get('preview_view_status') || 0;
    let textBox = '';
    if (type === 0) {
      textBox = `<edit-text-box :clearClass="true" uuid="${this.uuid}">${this.config.model.custom.label}</edit-text-box>`
    } else {
      textBox = this.config.model.custom.label;
    }

    return `
      <el-link type="primary">
        ${textBox}
      </el-link>
    `;
  }
}