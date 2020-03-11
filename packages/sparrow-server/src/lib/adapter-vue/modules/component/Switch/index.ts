import Base from '../Base';

export default class Switch extends Base{

  constructor (attrs: any, componentIndex: number) {
    super(attrs, componentIndex);
    this.labelValue = '即时配送';
  }

  public fragment () {
    return `
      <el-form-item label=" ">
        <label-box label="${this.labelValue}" :index="${this.componentIndex}"></label-box>
        <el-switch></el-switch>
      </el-form-item>
    `;
  }
}