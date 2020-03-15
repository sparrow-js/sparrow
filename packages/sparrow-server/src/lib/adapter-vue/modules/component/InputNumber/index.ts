import Base from '../Base';

export default class InputNumber extends Base{

  constructor (attrs: any, componentIndex: number) {
    super(attrs, componentIndex);
    this.labelValue = '数字文本框';
  }

  public fragment () {
    return `
      <el-form-item label=" " prop="name">
        <label-box label="${this.labelValue}" indexcomp="${this.componentIndex}"></label-box>
        <el-input-number :min="1" :max="10"></el-input-number>
      </el-form-item>
    `;
  }
}