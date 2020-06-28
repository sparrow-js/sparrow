import Base from '../Base';
import * as fsExtra from 'fs-extra';
import VueParse from '../../generator/VueParse';
import * as path from 'path';
import Config from '../../../config';

export default class CheckboxGroup extends Base{
  name: string = 'CheckboxGroup';
  vueParse: any;
  params: any;
  ele: string = '';
  constructor (params: any) {
    super();
    this.params = params;
    this.init();
    this.config = {
      // 组件自定义配置
      _custom: {
        required: false,
        regList: [],
        label: '多选框',
      },
      // 组件标签属性
      _attr: {
        'v-model': params['v-model'] || ''
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
    if (type === 'button') {
      this.ele = 'el-checkbox-button';
    } else {
      this.ele = 'el-checkbox';
    }
    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'component/CheckboxGroup', 'comp.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr); 
  }

  public fragment () {
    return `
      <el-form-item label=" "
        ${this._formItemStr}
      >
        <label-box 
          label="${this.config._custom.label}"
          uuid="${this.uuid}"
        ></label-box>
        <el-checkbox-group
          ${this._attrStr}
        >
          <${this.ele}
            v-for="item in checkboxOptions${this.uuid}"
            :key="item.value"
            :label="item.label"
          />
        </el-checkbox-group>
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

      if (config._slot) {
        const {data} = config._slot;
        if (data) {
          this.vueParse.setData(data);
        }
      }

      this._formItemStr = formItem.join(' ');
    }
  }


}