import * as fsExtra from 'fs-extra';
import VueParse from '../../../generator/VueParse';
import * as path from 'path';
import Base from '../Base';

export default class Delete extends Base{
  name: string;
  params: any;
  vueParse: any;
  uuid: string;
  type: string;
  constructor (type: string) {
    super()
    this.type = type;
    this.init();
  }
  /**
   *  {
        label: '删除',
        key: 'delete',
        type: 'button'
      }
   */
  private init () {
    const fileStr = fsExtra.readFileSync(path.join(__dirname, 'Delete.vue'), 'utf8');
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