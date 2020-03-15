import Base from '../Base';

export default class CheckboxGroup extends Base{
  params: any;
  ele: string = 'el-checkbox';
  constructor (attrs: any, componentIndex: number, params: any) {
    super(attrs, componentIndex);
    this.params = params;
    this.labelValue = '多选框';
    this.init();
  }

  private init () {
    const {type} = this.params;
    if (type === 'button') {
      this.ele = 'el-checkbox-button';
    }
  }

  public fragment () {
    return `
      <el-form-item label=" ">
        <label-box label="${this.labelValue}" indexcomp="${this.componentIndex}"></label-box>
        <el-checkbox-group>
          <${this.ele} :label="1">备选项1</${this.ele}>
          <${this.ele} :label="2">备选项2</${this.ele}>
          <${this.ele} :label="3">备选项3</${this.ele}>
        </el-checkbox-group>
      </el-form-item>
    `;
  }
}