import Base from '../Base';

export default class BaseInput extends Base{
  name: string;
  constructor (attrs: any) {
    super(attrs)
  }

  public fragment () {
    return `
      <el-form-item label=" " prop="name">
        <label-box label="基础文本框"></label-box>
        <el-input></el-input>
      </el-form-item>
    `;
  }
}