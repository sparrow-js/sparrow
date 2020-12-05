import Base from '../Base';
import * as _ from 'lodash';

export default class DatePicker extends Base {
  name: string = 'DatePicker';
  params: any;
  ele: string = '';

  constructor (params: any, boxPath: string) {
    super(boxPath);
    if (params.initType === 'auto') {
      this.config = params;
    } else {
      this.config = _.cloneDeep(require('./config'));
      this.config.model.custom.type = params.type;
    }
    
    this.setHandler();
    this.init();
  }

  private init () {
    const {type} = this.config.model.custom;
    if (type === 'range') {
      this.ele = `
        <el-date-picker
          ${this._attrStr}
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      `;
    } else {
      this.ele =`
        <el-date-picker
          ${this._attrStr}
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      `;
    }
  }

  public fragment () {
    return `
      ${this.ele}
    `;
  }

  protected setHandler () {
    const {config} = this;
    const {model} = config;
    this.setAttrsToStr();

    if (model.custom) {
      const formItem = [];
      const rules = [];

      const required = `{ required: true, message: '必填', trigger: 'change' }`;
      if (model.custom.required === true) {
        rules.push(required);
      }

      if (model.custom.regList && model.custom.regList.length > 0) {
        model.custom.regList.forEach(item => {
          if (item.rule && item.message) {
            const customRule = `{ pattern: ${item.rule}, message: '${item.message}', trigger: 'change' }`;
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