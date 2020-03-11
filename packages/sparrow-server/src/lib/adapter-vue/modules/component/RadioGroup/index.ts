import Base from '../Base';

export default class InputNumber extends Base{

  constructor (attrs: any, componentIndex: number) {
    super(attrs, componentIndex)
  }

  public fragment () {
    return `
      <el-form-item label=" ">
        <label-box label="特殊资源" :index="${this.componentIndex}"></label-box>
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
    `;
  }
}