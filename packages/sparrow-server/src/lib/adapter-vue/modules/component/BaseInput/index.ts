import Base from '../Base';

export default class BaseInput extends Base{
  name: string;
  constructor (attrs: any, componentIndex: number) {
    super(attrs, componentIndex)
  }

  public fragment () {
    return `
      <el-form-item label=" ">
        <label-box label="基础文本框" index="${this.componentIndex}"></label-box>
        <el-input></el-input>
      </el-form-item>
    `;
  }
}