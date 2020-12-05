import Base from '../Base';
import VueParse from '../../generator/VueParse';
import Config from '../../../config';
import * as _ from 'lodash';
import Template from './template';

export default class Autocomplete extends Base{
  name: string = 'Autocomplete';
  vueParse: any;
  constructor (params: any, boxPath: string) {
    super(boxPath);

    if (params.initType === 'auto') {
      this.config = params;
    } else {
      this.config = _.cloneDeep(require('./config'));
    }

    this.init();
   
    this.setHandler();
  }

  private init () {
    this.vueParse = new VueParse(this.uuid, Template.code);
  }

  public fragment () {
    return `
      <el-autocomplete
        :fetch-suggestions="querySearch${this.uuid}"
        @select="handleSelect${this.uuid}"
        ${this._attrStr}
      ></el-autocomplete>
    `;
  }

  protected setHandler () {
    const {config} = this;
    const {model} = config;
    this.setAttrsToStr();

    if (model.custom) {
      const formItem = [];
      const rules = [];

      const required = `{ required: true, message: '必填', trigger: 'blur' }`;
      if (model.custom.required === true) {
        rules.push(required);
      }

      if (model.custom.regList && model.custom.regList.length > 0) {
        model.custom.regList.forEach(item => {
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