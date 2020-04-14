import Base from '../Base';

/**
 * 
  config: {
    // 组件自定义配置
    _custom: {
      required: true,
      regList: []
    },
    // 组件标签属性
    _attr: {
      placeholder: '',
    },
    // 插槽属性
    // __slot__: {}
  }
 */

export default class Input extends Base{
  name: string;
  params: any;


  constructor (attrs: any, componentIndex: number, params: any) {
    super(attrs, componentIndex);
    this.params = params;
    this.labelValue = '文本框';
    this.config = {
      // 组件自定义配置
      _custom: {
        required: true,
        regList: []
      },
      // 组件标签属性
      _attr: {
        placeholder: '',
      },
      // 插槽属性
      // __slot__: {}
    };
    this.init();
  }

  private init () {
    const {type} = this.params;
    if (type === 'textarea') {
      this.attrs['type'] = 'textarea';
      this.attrs['rows'] = 4;
    }
  }

  public fragment () {
    return `
      <el-form-item label=" ">
        <label-box label="${this.labelValue}" indexcomp="${this.componentIndex}"></label-box>
        <el-input></el-input>
      </el-form-item>
    `;
  }

  protected setHandler () {
    console.log('*******11*******');
  }
}