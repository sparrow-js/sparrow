import Base from '../Base';

export default class Switch extends Base{

  constructor (attrs: any) {
    super(attrs)
  }

  public fragment () {
    return `
      <el-form-item label="即时配送">
        <el-switch></el-switch>
      </el-form-item>
    `;
  }
}