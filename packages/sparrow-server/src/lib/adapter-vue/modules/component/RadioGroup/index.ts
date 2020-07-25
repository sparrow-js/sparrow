import Base from '../Base';
import * as fsExtra from 'fs-extra';
import VueParse from '../../generator/VueParse';
import * as path from 'path';
import Config from '../../../config';

export default class RadioGroup extends Base{
  name: string = 'RadioGroup';
  vueParse: any;
  ele: string = '';
  constructor (params: any, boxPath: string) {
    super(boxPath);
    this.initVueParse();
    if (params.initType === 'auto') {
      const oldRadionboxOptions = params._slot.data.match(/radionboxOptions[a-z0-9]+/)[0];
      params._slot.data = params._slot.data.replace(oldRadionboxOptions, `radionboxOptions${this.uuid}`)
      this.config = params;
    } else {
      this.config = {
        // 组件自定义配置
        _custom: {
          required: false,
          regList: [],
          label: '单选框',
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
    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'component/RadioGroup', 'comp.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr); 
  }

  private init () {
    const {type} = this.config._custom;
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