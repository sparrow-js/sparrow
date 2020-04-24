import Base from '../Base';

export default class TimePicker extends Base {
  params: any;
  ele: string = '';

  constructor (attrs: any, componentIndex: number, params: any) {
    super(attrs, componentIndex);
    this.labelValue = '时间选择器';
    this.params = params;
    this.init();
  }

  private init () {
    const {type} = this.params;
    if (type === 'range') {
      this.ele = `
      <el-date-picker
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      `;
    } else {
      this.ele = `
        <el-date-picker
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      `;
    }
  }

  public fragment () {
    return `
      <el-form-item label=" ">
        <label-box label="${this.labelValue}" :index="${this.componentIndex}"></label-box>
        ${this.ele}
      </el-form-item>
    `;
  }
}