
import Common from '../Common'
const uuid = require('@lukeed/uuid');

export default class Link extends Common{
  name: string = 'Link';
  config: any = {};
  $fragment: any;

  constructor (params: any) {
    super();
    this.config = require('./config.ts').default;
    this.setAttrsToStr();
  }

  public insertEditText (params) {
    this.config.model.custom.label = params.value;
  }

  public getFragment () {
    return `
      <el-link type="primary">
        <edit-text-box :clearClass="true" uuid="${this.uuid}">${this.config.model.custom.label}</edit-text-box>
      </el-link>
    `;
  }
}