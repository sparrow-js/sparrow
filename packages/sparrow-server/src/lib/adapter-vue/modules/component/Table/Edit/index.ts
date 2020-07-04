import * as fsExtra from 'fs-extra';
import VueParse from '../../../generator/VueParse';
import * as path from 'path';
import Base from '../Base';
import Config from '../../../../config';

export default class Edit extends Base{
  name: string = 'Edit';
  params: any;
  vueParse: any;
  uuid: string;
  type: string;
  constructor (params: any = {}) {
    super()
    this.type = params.type;
    this.init();
  }
  private init () {
    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'component/Table/Edit', 'comp.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr);
  }

  public fragment () {
    if (this.type === 'button') {
      return `
        <el-button size="mini" type="success" @click="handleEdit(row,$index)">
          编辑
        </el-button>
      `;
    } else if (this.type === 'link') {
      return `
        <el-link type="success" @click="handleEdit(row,$index)">
          编辑
        </el-link>
      `;
    }
    
    return '';
  }
}