
import * as cheerio from 'cheerio';
import Common from '../Common'
const uuid = require('@lukeed/uuid');

export default class Button extends Common{
  name: string = 'Button';
  config: any = {};
  $fragment: any;
  isInline: boolean = true; 

  constructor (params: any) {
    super();
    this.config = require('./config.ts').default;
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
      <el-button type="primary" ${this._attrStr}>
        <edit-text-box :clearClass="true" uuid="${this.uuid}">${this.config.model.custom.label}</edit-text-box>
      </el-button>
    `;
  }
}