import Base from '../Base';
import * as _ from 'lodash';

export default class InputNumber extends Base{
  name: string = 'InputNumber';

  constructor (params: any, boxPath: string) {
    super(boxPath);
    if (params.initType === 'auto') {
      this.config = params;
    } else {
      this.config = _.cloneDeep(require('./config').default);
    }
  }

  public fragment () {
    return `
      <el-input-number ${this._attrStr} :min="1" :max="10"></el-input-number>
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