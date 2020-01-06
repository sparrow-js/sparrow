import Base from '../Base';

export default class BaseInput extends Base{
  
  constructor (attrs: any) {
    super(attrs)
  }

  public fragment () {
    return `
      <el-form-item label="基础文本框" prop="name">
        <el-input></el-input>
      </el-form-item>
    `;
  }
}