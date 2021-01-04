import Base from '../Base';
import * as fsExtra from 'fs-extra';
import VueParse from '../../generator/VueParse';
import * as path from 'path';
import Config from '../../../config';
import * as _ from 'lodash';
import {apiUrlParse} from '../../../../../util/apiUtil';

export default class Select extends Base {
  name: string = 'Select';
  vueParse: any;
  status: string = '';

  constructor (params: any, boxPath: string) {
    super(boxPath);
    apiUrlParse('');
    this.initVueParse();
    if (params.initType === 'auto') {
      const oldOptions = params.model.slot.data.match(/selectOptions[a-z0-9]+/)[0];
      params.model.slot.data = params.model.slot.data.replace(oldOptions, `selectOptions${this.uuid}`)
      this.config = params;
    } else {
      this.config = _.cloneDeep(require('./config').default);
      this.config.model.slot.data = this.vueParse.getFormatData();
      this.config.model.custom.type = params.type;
    }
    this.init();

    this.setHandler();
  }

  private initVueParse () {
    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'component/Select', 'comp.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr); 
  }

  private init () {
    const {type} = this.config.model.custom;
    if (type === 'clearable') {
      this.status = 'clearable';
    } else if (type === 'multiple') {
      this.status = 'multiple';
    } else if (type === 'filterable') {
      this.status = 'filterable';
    } else if (type === 'allow-create') {
      this.status = 'allow-create';
    }

  }

  public fragment () {
    return `
      <el-select 
        ${this.status} 
        ${this._attrStr}>
        <el-option
          v-for="item in selectOptions${this.uuid}"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
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


    if (model.slot) {
      const {data} = model.slot;
      if (data) {
        this.vueParse.setData(data);
      }
    }
  }
}