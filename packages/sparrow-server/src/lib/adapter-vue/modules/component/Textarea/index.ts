import Base from '../Base';

export default class Textarea extends Base {
  constructor (attrs: any) {
    super(attrs)
  }

  public fragment () {
    return `
      <el-form-item label="活动形式">
        <el-input type="textarea"></el-input>
      </el-form-item>
    `;
  }
}