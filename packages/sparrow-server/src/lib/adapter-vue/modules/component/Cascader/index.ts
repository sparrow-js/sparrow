import Base from '../Base';
import * as fsExtra from 'fs-extra';
import VueParse from '../../generator/VueParse';
import * as path from 'path';
import Config from '../../../config';

export default class Select extends Base {
  vueParse: any;
  params: any;

  constructor (attrs: any, componentIndex: number, params: any) {
    super(attrs, componentIndex);
    this.labelValue = '级联选择器';
    this.params = params;
    this.init();
  }

  private init () {
    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'component/Cascader', 'comp.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr);
  }

  public fragment () {
    return `
      <el-form-item label=" ">
        <label-box label="${this.labelValue}" indexcomp="${this.componentIndex}"></label-box>
        <el-cascader
          v-model="value"
          :options="cascaderOptions"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange${this.uuid}"></el-cascader>
      </el-form-item>
    `;
  }
}