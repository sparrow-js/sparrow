import * as fsExtra from 'fs-extra';
import Base from '../Base';
import VueParse from '../../generator/VueParse';
import * as path from 'path';
import Config from '../../../config';

export default class Autocomplete extends Base{
  name: string;
  params: any;
  vueParse: any;
  constructor (attrs: any, componentIndex: number, params: any) {
    super(attrs, componentIndex);
    this.params = params;
    this.labelValue = '文本框';
    this.init();
  }

  private init () {
    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'component/Autocomplete',  'comp.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr);
  }

  public fragment () {
    return `
      <el-form-item label=" "
        ${this._formItemStr}
      >
        <label-box 
          label="${this.labelValue}"
          indexcomp="${this.componentIndex}"
        ></label-box>
        <el-autocomplete
          :fetch-suggestions="querySearch${this.uuid}"
          @select="handleSelect${this.uuid}"
          ${this._attrStr}
        ></el-autocomplete>
      </el-form-item>
    `;
  }

  protected setHandler () {
    const {config} = this;
    this.setAttrsToStr();

    if (config._custom) {
      const formItem = [];
      const rules = [];

      const required = `{ required: true, message: '必填', trigger: 'blur' }`;
      if (config._custom.required === true) {
        rules.push(required);
      }

      if (config._custom.regList && config._custom.regList.length > 0) {
        config._custom.regList.forEach(item => {
          if (item.rule && item.message) {
            const customRule = `{ pattern: ${item.rule}, message: '${item.message}', trigger: 'blur' }`;
            rules.push(customRule)
          }
        });
      }

      if (rules.length > 0) {
        formItem.push(`:rules="[${rules.join(',')}]"`)
      }

      this._formItemStr = formItem.join(' ');
    }
  }
}