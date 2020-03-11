import Base from '../Base';

export default class Switch extends Base{

  constructor (attrs: any, componentIndex: number) {
    super(attrs, componentIndex)
  }

  public fragment () {
    return `
      <el-form-item label=" ">
        <label-box label="即时配送" :index="${this.componentIndex}"></label-box>
        <el-switch></el-switch>
      </el-form-item>
    `;
  }
}