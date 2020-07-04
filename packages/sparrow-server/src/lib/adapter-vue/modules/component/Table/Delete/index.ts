import * as fsExtra from 'fs-extra';
import VueParse from '../../../generator/VueParse';
import * as path from 'path';
import Base from '../Base';
import Config from '../../../../config';

export default class Delete extends Base{
  name: string = 'Delete';
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
    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'component/Table/Delete', 'comp.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr);
  }

  public fragment () {
    if (this.type === 'button') {
      return `
        <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
          删除
        </el-button>
      `;
    } else if (this.type === 'link') {
      return `
        <el-link type="danger" @click="handleDelete(row,$index)">
          删除
        </el-link>
      `;
    }
    
    return '';
  }
}