import * as cheerio from 'cheerio';
import storage from '../../../storage';


const uuid = require('@lukeed/uuid');


export default class Base {
  public ascription = 'form'; // 表单归属
  public $fragment: any;
  public labelValue = '';
  public uuid = '';
  public config: any = {};
  public _attrStr: string = '';
  public _formItemStr: string = '';
  public insertFileType = 'inline';
  public boxPath: string = '';

  constructor (boxPath: string) {
    this.boxPath = boxPath || '';
    this.uuid = uuid().split('-')[0]; 
  }

  public renderFragment () {
    let compBox = `
      <component-box uuid="${this.uuid}">
        ${this.fragment()}
      </component-box>
    `;
    const type = storage.get('preview_view_status') || 0;
    if (type) {
      compBox = this.fragment();
    }
    let formItem = ''
    if (this.boxPath.match('Form') || this.config._custom.insideForm === true) {
      this.config._custom.insideForm = true;
      formItem = `
        <el-form-item label=" "
          ${this._formItemStr}
        >
          <label-box 
            label="${this.config._custom.label}" 
            uuid="${this.uuid}"
          ></label-box>
          ${compBox}
        </el-form-item>
      `;
    } else {
      formItem = `
        ${compBox}
      `;
    }

    this.$fragment = cheerio.load(formItem, {
      xmlMode: true,
      decodeEntities: false,
    });
  }

  public fragment () {
    return '';
  }

  public getFragment (type: number) {
    this.renderFragment();

    if (type === 1) {
      this.$fragment('label-box').remove();
      this.$fragment('el-form-item').attr('label', this.config._custom.label);
    }
    return this.$fragment;
  }

  public insertLabel(labelValue: string) {
    this.config._custom.label = labelValue
  }

  public getConfig() {
    return this.config
  }

  protected setHandler () {}

  public settingConfig (config: any) {
    this.config = config;
    this.setHandler();
  }

  public setAttrsToStr () {
    const {config} = this;
    if (config._attr) {
      const formField = [];
      Object.keys(config._attr).forEach(key => {
        if (key === 'v-model' && !config._attr[key]) {
          return;
        }
        formField.push(`${key}="${config._attr[key]}"`);
      });
      this._attrStr = formField.join(' ');
    }
  }

  public removeAttr (attr: string) {
    this.$fragment.root().children().removeAttr(attr);
  }

}