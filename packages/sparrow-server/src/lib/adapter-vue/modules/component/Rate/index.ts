import Base from '../Base';

export default class Rate extends Base{
  name: string = 'Rate';
  params: any;

  constructor (params: any) {
    super();
    this.params = params;
    this.config = {
      // 组件自定义配置
      _custom: {
        required: false,
        label: '评分',
      },
      // 组件标签属性
      _attr: {
        'v-model': params['v-model'] || ''
      },
    };
    this.setHandler();
  }

  public fragment () {
    return `
      <el-form-item
        label=" "
        ${this._formItemStr}
      >
        <label-box 
          label="${this.config._custom.label}"
          uuid="${this.uuid}"
        ></label-box>
        <el-rate ${this._attrStr}></el-rate>
      </el-form-item>
    `;
  }

  protected setHandler () {
    const {config} = this;
    this.setAttrsToStr();

    if (config._custom) {
      const formItem = [];
      const rules = [];

      const required = `{ required: true, message: '必填', trigger: 'blur' }`;
      if (config._custom.required === true) {
        rules.push(required);
      }

      if (rules.length > 0) {
        formItem.push(`:rules="[${rules.join(',')}]"`)
      }
    
      this._formItemStr = formItem.join(' ');
    }
  }
}