import * as fsExtra from 'fs-extra';
import Base from '../Base';
import VueParse from '../../generator/VueParse';
import * as path from 'path';

export default class Autocomplete extends Base{
  name: string;
  params: any;
  vueParse: any;
  constructor (attrs: any, componentIndex: number, params: any) {
    super(attrs, componentIndex);
    this.params = params;
    this.labelValue = '文本框';
    this.init();
  }

  private init () {
    const {type} = this.params;
    if (type === 'textarea') {
      this.attrs['type'] = 'textarea';
      this.attrs['rows'] = 4;
    }
    const fileStr = fsExtra.readFileSync(path.join(__dirname, 'comp.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr);
  }

  public fragment () {
    return `
      <el-form-item label=" ">
        <label-box label="${this.labelValue}" indexcomp="${this.componentIndex}"></label-box>
        <el-autocomplete
          v-model="state1"
          :fetch-suggestions="querySearch${this.uuid}"
          placeholder="请输入内容"
          @select="handleSelect${this.uuid}"
        ></el-autocomplete>
      </el-form-item>
    `;
  }
}