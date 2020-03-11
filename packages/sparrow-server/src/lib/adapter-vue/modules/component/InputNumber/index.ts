import Base from '../Base';

export default class InputNumber extends Base{

  constructor (attrs: any, componentIndex: number) {
    super(attrs, componentIndex)
  }

  public fragment () {
    return `
      <el-form-item label="数字文本框" prop="name">
        <label-box label="数字文本框" :index="${this.componentIndex}"></label-box>
        <el-input-number :min="1" :max="10"></el-input-number>
      </el-form-item>
    `;
  }
}