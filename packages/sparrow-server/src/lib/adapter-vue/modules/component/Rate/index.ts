import Base from '../Base';

export default class Rate extends Base{
  name: string;
  params: any;

  constructor (attrs: any, componentIndex: number, params: any) {
    super(attrs, componentIndex);
    this.params = params;
    this.labelValue = '评分';
  }

  public fragment () {
    return `
      <el-form-item label=" ">
        <label-box label="${this.labelValue}" indexcomp="${this.componentIndex}"></label-box>
        <el-rate v-model="value1"></el-rate>
      </el-form-item>
    `;
  }
}