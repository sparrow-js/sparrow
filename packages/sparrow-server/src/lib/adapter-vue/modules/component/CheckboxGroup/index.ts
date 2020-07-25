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
  constructor (params: any, boxPath: string) {
    super(boxPath);
    this.initVueParse();
    this.params = params;
    if (params.initType === 'auto') {
      const oldcheckboxOptions = params._slot.data.match(/checkboxOptions[a-z0-9]+/)[0];
      params._slot.data = params._slot.data.replace(oldcheckboxOptions, `checkboxOptions${this.uuid}`)
      this.config = params;
    } else {
      this.config = {
        // 组件自定义配置
        _custom: {
          required: false,
          regList: [],
          label: '多选框',
          type: params.type
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
    }

    this.init();
    this.setHandler();
  }

  private initVueParse () {
    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'component/CheckboxGroup', 'comp.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr); 
  }
  private init () {
    const {type} = this.config._custom;
    if (type === 'button') {
      this.ele = 'el-checkbox-button';
    } else {
      this.ele = 'el-checkbox';
    }

  }

  public fragment () {
    return `
      <el-checkbox-group
        ${this._attrStr}
      >
        <${this.ele}
          v-for="item in checkboxOptions${this.uuid}"
          :key="item.value"
          :label="item.label"
        />
      </el-checkbox-group>
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