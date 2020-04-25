import Base from '../Base';

export default class Rate extends Base{
  name: string;
  params: any;

  constructor (attrs: any, componentIndex: number, params: any) {
    super(attrs, componentIndex);
    this.params = params;
    this.labelValue = '评分';
    this.config = {
      // 组件自定义配置
      _custom: {
        required: false,
      },
      // 组件标签属性
      _attr: {
        'v-model': attrs['v-model'] || ''
      },
    };
  }

  public fragment () {
    return `
      <el-form-item
        label=" "
        ${this._formItemStr}
      >
        <label-box 
          label="${this.labelValue}" 
          indexcomp="${this.componentIndex}"
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