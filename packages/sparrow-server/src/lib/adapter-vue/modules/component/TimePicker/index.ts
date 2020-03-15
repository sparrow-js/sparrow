import Base from '../Base';

export default class TimePicker extends Base {
  params: any;
  pickerOptions: string = `
    :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
  }"
  `;

  constructor (attrs: any, componentIndex: number, params: any) {
    super(attrs, componentIndex);
    this.labelValue = '时间选择器';
    this.params = params;
    this.init();
  }

  private init () {
    const {type} = this.params;
    if (type === 'range') {
      this.pickerOptions = `
        :picker-options="{
          selectableRange: '18:30:00 - 20:30:00'
        }
      `;

    }
  }

  public fragment () {
    return `
      <el-form-item label=" ">
        <label-box label="${this.labelValue}" :index="${this.componentIndex}"></label-box>
        
        <el-time-select
          ${this.pickerOptions}
          placeholder="选择时间">
        </el-time-select>

      </el-form-item>
    `;
  }
}