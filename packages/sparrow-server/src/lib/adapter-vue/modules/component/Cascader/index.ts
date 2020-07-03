import Base from '../Base';
import * as fsExtra from 'fs-extra';
import VueParse from '../../generator/VueParse';
import * as path from 'path';
import Config from '../../../config';

export default class Cascader extends Base {
  name: string = 'Cascader';
  vueParse: any;

  constructor (params: any) {
    super();
    this.init();
    if (params.initType === 'auto') {
      this.config = params;
    } else {
      this.config = {
        // 组件自定义配置
        _custom: {
          required: false,
          regList: [],
          label: '级联选择器',
        },
        // 组件标签属性
        _attr: {
          placeholder: '请输入',
          'v-model': params['v-model'] || ''
        },
        // 插槽属性
        _slot: {
          data: this.vueParse.getFormatData()
        }
      };
    }

    this.setHandler();
  }

  private init () {
    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'component/Cascader', 'comp.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr);
  }

  public fragment () {
    return `
      <el-form-item label=" ">
        <label-box 
          label="${this.config._custom.label}"
          uuid="${this.uuid}">
        </label-box>
        <el-cascader
          ${this._attrStr}
          :options="cascaderOptions${this.uuid}"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange${this.uuid}"></el-cascader>
      </el-form-item>
    `;
  }

  protected setHandler () {
    const {config} = this;
    this.setAttrsToStr();

    if (config._custom) {
      const formItem = [];
      const rules = [];

      const required = `{ required: true, message: '必填', trigger: 'change' }`;
      if (config._custom.required === true) {
        rules.push(required);
      }

      if (config._custom.regList && config._custom.regList.length > 0) {
        config._custom.regList.forEach(item => {
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

    if (config._slot) {
      const {data} = config._slot;
      if (data) {
        this.vueParse.setData(data);
      }
    }
  }
}