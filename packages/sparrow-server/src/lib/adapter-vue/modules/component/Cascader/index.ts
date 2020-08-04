import Base from '../Base';
import * as fsExtra from 'fs-extra';
import VueParse from '../../generator/VueParse';
import * as path from 'path';
import Config from '../../../config';
import * as _ from 'lodash';

export default class Cascader extends Base {
  name: string = 'Cascader';
  vueParse: any;

  constructor (params: any, boxPath: string) {
    super(boxPath);
    this.init();
    if (params.initType === 'auto') {
      const oldOptions = params.model.slot.data.match(/cascaderOptions[a-z0-9]+/)[0];
      params.model.slot.data = params.model.slot.data.replace(oldOptions, `cascaderOptions${this.uuid}`)
      this.config = params;
    } else {
      this.config = _.cloneDeep(require('./config').default);
      this.config.model.slot.data = this.vueParse.getFormatData();
    }

    this.setHandler();
  }

  private init () {
    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'component/Cascader', 'comp.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr);
  }

  public fragment () {
    return `
      <el-cascader
        ${this._attrStr}
        :options="cascaderOptions${this.uuid}"
        :props="{ expandTrigger: 'hover' }"
        @change="handleChange${this.uuid}"></el-cascader>
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