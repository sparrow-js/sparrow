import Base from '../Base';
import * as fsExtra from 'fs-extra';
import VueParse from '../../generator/VueParse';
import * as path from 'path';
import Config from '../../../config';

export default class Select extends Base {
  vueParse: any;
  params: any;
  status: string = '';

  constructor (attrs: any, componentIndex: number, params: any) {
    super(attrs, componentIndex);
    this.labelValue = '特殊资源';
    this.params = params;
    this.init();
  }

  private init () {
    const {type} = this.params;
    if (type === 'clearable') {
      this.status = 'clearable';
    } else if (type === 'multiple') {
      this.status = 'multiple';
    } else if (type === 'filterable') {
      this.status = 'filterable';
    } else if (type === 'allow-create') {
      this.status = 'allow-create';
    }
    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'component/Select', 'comp.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr);
  }

  public fragment () {
    return `
      <el-form-item label=" ">
        <label-box label="${this.labelValue}" indexcomp="${this.componentIndex}"></label-box>
        <el-select placeholder="请选择" ${this.status}>
          <el-option
            v-for="item in selectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    `;
  }
}