
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
    this.config = _.cloneDeep(require('./config').default);
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
    let textBox = '';
    if (type === 0) {
      textBox = `<edit-text-box :clearClass="true" uuid="${this.uuid}">${this.config.model.custom.label}</edit-text-box>`
    } else {
      textBox = this.config.model.custom.label;
    }

    return `
      <el-tag ${this._attrStr}>
        ${textBox}
      </el-tag>
    `;
  }
}