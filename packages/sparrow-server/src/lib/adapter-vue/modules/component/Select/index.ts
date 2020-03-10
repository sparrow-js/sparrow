import Base from '../Base';

export default class Select extends Base {

  constructor (attrs: any) {
    super(attrs)
  }

  public fragment () {
    return `
      <el-form-item label=" ">
        <label-box label="活动区域"></label-box>
        <el-select placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    `;
  }
}