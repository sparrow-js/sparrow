import Base from '../Base';

export default class Textarea extends Base {
  name: string = 'Textarea';
  constructor (attrs: any, componentIndex: number) {
    super(attrs, componentIndex);
    this.labelValue = '多行文本框';
    this.config = {
      // 组件自定义配置
      _custom: {
        required: false,
        regList: []
      },
      // 组件标签属性
      _attr: {
        placeholder: '',
        'v-model': attrs['v-model'] || ''
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
          label="${this.labelValue}" 
          :index="${this.componentIndex}"
          uuid="${this.uuid}"
        ></label-box>
        <el-input
          ${this._attrStr}
          type="textarea"></el-input>
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

      if (config._custom.regList && config._custom.regList.length > 0) {
        config._custom.regList.forEach(item => {
          if (item.rule && item.message) {
            const customRule = `{ pattern: ${item.rule}, message: '${item.message}', trigger: 'blur' }`;
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