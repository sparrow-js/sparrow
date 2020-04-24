import Base from '../Base';
import * as fsExtra from 'fs-extra';
import VueParse from '../../generator/VueParse';
import * as path from 'path';
import Config from '../../../config';

export default class CheckboxGroup extends Base{
  vueParse: any;
  params: any;
  ele: string = '';
  constructor (attrs: any, componentIndex: number, params: any) {
    super(attrs, componentIndex);
    this.params = params;
    this.labelValue = '多选框';
    this.config = {
      // 组件自定义配置
      _custom: {
        required: false,
        regList: []
      },
      // 组件标签属性
      _attr: {
        'v-model': attrs['v-model'] || ''
      },
      // 插槽属性
      __slot: {
        data: this.vueParse.getFormatData()
      }
    };
    this.init();
  }

  private init () {
    const {type} = this.params;
    if (type === 'button') {
      this.ele = 'el-checkbox-button';
    } else {
      this.ele = 'el-checkbox';
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

      this._formItemStr = formItem.join(' ');
    }
  }


}