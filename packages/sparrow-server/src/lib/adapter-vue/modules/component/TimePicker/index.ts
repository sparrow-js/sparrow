import Base from '../Base';

export default class TimePicker extends Base {
  name: string = 'TimePicker';
  params: any;
  pickerOptions: string = '';

  constructor (attrs: any, componentIndex: number, params: any) {
    super(attrs, componentIndex);
    this.labelValue = '时间选择器';
    this.params = params;
    this.init();
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
      _slot: {}
    };
  }

  private init () {
    const {type} = this.params;
    if (type === 'range') {
      this.pickerOptions = `
        is-range
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
      `;
    } else {
      this.pickerOptions = `
        :picker-options="{
          start: '08:30',
          step: '00:15',
          end: '18:30'
        }"
      `
    }
  }

  public fragment () {
    return `
      <el-form-item label=" "
        ${this._formItemStr}
      >
        <label-box label="${this.labelValue}" :index="${this.componentIndex}"></label-box>
        
        <el-time-picker
          ${this._attrStr}
          ${this.pickerOptions}
          placeholder="选择时间">
        </el-time-picker>

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