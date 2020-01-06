import Base from '../Base';

export default class InputNumber extends Base{

  constructor (attrs: any) {
    super(attrs)
  }

  public fragment () {
    return `
      <el-form-item label="数字文本框" prop="name">
        <el-input-number :min="1" :max="10"></el-input-number>
      </el-form-item>
    `;
  }
}