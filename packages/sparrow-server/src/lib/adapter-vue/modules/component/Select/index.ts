import Base from '../Base';
import * as fsExtra from 'fs-extra';
import VueParse from '../../generator/VueParse';
import * as path from 'path';
import Config from '../../../config';

export default class Select extends Base {
  name: string = 'Select';
  vueParse: any;
  params: any;
  status: string = '';

  constructor (attrs: any, componentIndex: number, params: any) {
    super(attrs, componentIndex);
    this.labelValue = '特殊资源';
    this.params = params;
    this.init();
    this.config = {
      // 组件自定义配置
      _custom: {
        required: false,
        regList: []
      },
      // 组件标签属性
      _attr: {
        placeholder: '请输入',
        'v-model': attrs['v-model'] || ''
      },
      // 插槽属性
      _slot: {
        data: this.vueParse.getFormatData()
      }
    };
    this.setHandler();
  }

  private init () {
    const {type} = this.params;
    if (type === 'clearable') {
      this.status = 'clearable';
    } else if (type === 'multiple') {
      this.status = 'multiple';
    } else if (type === 'filterable') {
      this.status = 'filterable';
    } else if (type === 'allow-create') {
      this.status = 'allow-create';
    }

    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'component/Select', 'comp.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr); 
  }

  public fragment () {
    return `
      <el-form-item label=" "
        ${this._formItemStr}
      >
        <label-box label="${this.labelValue}" indexcomp="${this.componentIndex}"></label-box>
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