import Base from '../Base';

export default class DateTimePicker extends Base {
  name: string = 'DateTimePicker';
  params: any;
  ele: string = '';

  constructor (attrs: any, componentIndex: number, params: any) {
    super(attrs, componentIndex);
    this.labelValue = '时间选择器';
    this.params = params;
    this.config = {
      // 组件自定义配置
      _custom: {
        required: false,
        regList: []
      },
      // 组件标签属性
      _attr: {
        'v-model': attrs['v-model'] || '',
      },
      // 插槽属性
      _slot: {}
    };
    this.setHandler();
    this.init();
  }

  private init () {
    const {type} = this.params;
    if (type === 'range') {
      this.ele = `
      <el-date-picker
        ${this._attrStr}
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      `;
    } else {
      this.ele = `
        <el-date-picker
          ${this._attrStr}
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      `;
    }
  }

  public fragment () {
    return `
      <el-form-item 
        label=" "
        ${this._formItemStr}
      >
        <label-box label="${this.labelValue}" :indexcomp="${this.componentIndex}"></label-box>
        ${this.ele}
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