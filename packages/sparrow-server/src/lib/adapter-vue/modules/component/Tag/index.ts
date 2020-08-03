
import Common from '../Common'

const uuid = require('@lukeed/uuid');

export default class Tag extends Common{
  name: string = 'Tag';
  config: any = {};
  $fragment: any;
  isInline: boolean = true; 

  constructor (params: any) {
    super();
    this.config = require('./config').default;
    this.setAttrsToStr();
  }



  getConfig () {
    return this.config;
  }

  public insertEditText (params) {
    this.config.model.custom.label = params.value;
  }

  public fragment () {
    return `
      <el-tag ${this._attrStr}>
        <edit-text-box :clearClass="true" uuid="${this.uuid}">${this.config.model.custom.label}</edit-text-box>
      </el-tag>
    `;
  }
}