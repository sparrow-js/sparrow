import Base from '../Base';

export default class Textarea extends Base {
  constructor (attrs: any, componentIndex: number) {
    super(attrs, componentIndex);
    this.labelValue = '活动形式';
  }

  public fragment () {
    return `
      <el-form-item label=" ">
        <label-box label="${this.labelValue}" :index="${this.componentIndex}"></label-box>
        <el-input type="textarea"></el-input>
      </el-form-item>
    `;
  }
}