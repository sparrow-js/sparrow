import Base from '../Base';
import * as _ from 'lodash';

export default class Input extends Base{
  name: string = 'Input';

  constructor (params: any, boxPath: string) {
    super(boxPath);
    if (params.initType === 'auto') {
      this.config = params;
    } else {
      this.config = _.cloneDeep(require('./config').default);
      this.config.model.custom.type = params.type;
    }
    
    this.init();
    this.setHandler();
  }

  private init () {
    const {type} = this.config.model.custom;
    if (type === 'textarea') {
      this.config.model.attr['type'] = 'textarea';
      this.config.model.attr['rows'] = 4;
    }
  }

  public fragment () {
    return `
      <el-input ${this._attrStr}></el-input>
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