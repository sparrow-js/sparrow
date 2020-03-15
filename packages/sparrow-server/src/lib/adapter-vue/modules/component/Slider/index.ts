import Base from '../Base';

export default class Slider extends Base{

  constructor (attrs: any, componentIndex: number) {
    super(attrs, componentIndex);
    this.labelValue = '滑块';
  }

  public fragment () {
    return `
      <el-form-item label=" ">
        <label-box label="${this.labelValue}" indexcomp="${this.componentIndex}"></label-box>
        <el-slider></el-slider>
      </el-form-item>
    `;
  }
}