import Base from '../Base';
import VueParse from '../../generator/VueParse';
import Config from '../../../config';
import * as _ from 'lodash';
import Template from './template';

export default class RadioGroup extends Base{
  name: string = 'RadioGroup';
  vueParse: any;
  ele: string = '';
  constructor (params: any, boxPath: string) {
    super(boxPath);
    this.initVueParse();
    if (params.initType === 'auto') {
      const oldRadionboxOptions = params.model.slot.data.match(/radionboxOptions[a-z0-9]+/)[0];
      params.model.slot.data = params.model.slot.data.replace(oldRadionboxOptions, `radionboxOptions${this.uuid}`)
      this.config = params;
    } else {
      this.config = _.cloneDeep(require('./config'));
      this.config.model.slot.data = this.vueParse.getFormatData();
      this.config.model.custom.type = params.type;

    }
    this.init();

    this.setHandler();
  }

  private initVueParse () {
    this.vueParse = new VueParse(this.uuid, Template.code); 
  }

  private init () {
    const {type} = this.config.model.custom;
    if (type === 'button') {
      this.ele = 'el-radio-button';
    } else {
      this.ele = 'el-radio';
    }
  }


  public fragment () {
    return `
      <el-radio-group
        ${this._attrStr}
      >
        <${this.ele}
        v-for="item in radionboxOptions${this.uuid}"
        :key="item.value"
        :label="item.label"
        />
      </el-radio-group>
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

      if (model.slot) {
        const {data} = model.slot;
        if (data) {
          this.vueParse.setData(data);
        }
      }

      this._formItemStr = formItem.join(' ');
    }
  }
}