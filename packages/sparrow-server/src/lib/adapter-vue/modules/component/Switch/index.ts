import Base from '../Base';

export default class Switch extends Base{
  name: string = 'Switch';
  constructor (params: any) {
    super();
    this.config = {
      // 组件自定义配置
      _custom: {
        required: false,
        regList: [],
        label: '开关',
      },
      // 组件标签属性
      _attr: {
        placeholder: '请输入',
        'v-model': params['v-model'] || ''
      },
      // 插槽属性
      _slot: {}
    };
    this.setHandler();
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
        <el-switch
          ${this._attrStr}
        ></el-switch>
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