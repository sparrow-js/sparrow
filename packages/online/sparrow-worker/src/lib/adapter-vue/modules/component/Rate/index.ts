import Base from '../Base';
import * as _ from 'lodash';

export default class Rate extends Base{
  name: string = 'Rate';
  params: any;

  constructor (params: any, boxPath: string) {
    super(boxPath);
    this.params = params;
    this.config = _.cloneDeep(require('./config'));
    this.setHandler();
  }

  public fragment () {
    return `
      <el-rate ${this._attrStr}></el-rate>
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

      if (rules.length > 0) {
        formItem.push(`:rules="[${rules.join(',')}]"`)
      }
    
      this._formItemStr = formItem.join(' ');
    }
  }
}