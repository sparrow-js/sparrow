import Base from '../Base';

export default class Slider extends Base{
  name: string = 'Slider';
  constructor (params: any, boxPath: string) {
    super(boxPath);
    if (params.initType === 'auto') {
      this.config = params;
    } else {
      this.config = {
        // 组件自定义配置
        _custom: {
          required: false,
          regList: [],
          label: '滑块',
        },
        // 组件标签属性
        _attr: {
          placeholder: '请输入',
          'v-model': params['v-model'] || ''
        },
        // 插槽属性
        _slot: {}
      };
    }
   
    this.setHandler();
  }

  public fragment () {
    return `
      <el-slider
        ${this._attrStr}
      ></el-slider>
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