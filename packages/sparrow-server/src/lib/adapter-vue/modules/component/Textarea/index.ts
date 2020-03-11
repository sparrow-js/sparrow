import Base from '../Base';

export default class Textarea extends Base {
  constructor (attrs: any, componentIndex: number) {
    super(attrs, componentIndex)
  }

  public fragment () {
    return `
      <el-form-item label=" ">
        <label-box label="活动形式" :index="${this.componentIndex}"></label-box>
        <el-input type="textarea"></el-input>
      </el-form-item>
    `;
  }
}