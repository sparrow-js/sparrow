import Base from '../Base';
import * as _ from 'lodash';

export default class TimePicker extends Base {
  name: string = 'TimePicker';
  pickerOptions: string = '';

  constructor (params: any, boxPath: string) {
    super(boxPath);
    if (params.initType === 'auto') {
      this.config = params;
    } else {
      this.config = _.cloneDeep(require('./config'));
      this.config.model.custom.type = params.type;
    }
    this.init();
  
  }

  private init () {
    const {type} = this.config.model.custom;
    if (type === 'range') {
      this.pickerOptions = `
        is-range
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
      `;
    } else {
      this.pickerOptions = `
        :picker-options="{
          start: '08:30',
          step: '00:15',
          end: '18:30'
        }"
      `
    }
  }

  public fragment () {
    return `
      <el-time-picker
        ${this._attrStr}
        ${this.pickerOptions}
        placeholder="选择时间">
      </el-time-picker>
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