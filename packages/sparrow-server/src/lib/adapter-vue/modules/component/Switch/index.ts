import Base from '../Base';

export default class Switch extends Base{

  constructor (attrs: any) {
    super(attrs)
  }

  public fragment () {
    return `
      <el-form-item label=" ">
        <label-box label="即时配送"></label-box>
        <el-switch></el-switch>
      </el-form-item>
    `;
  }
}