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
  
  private init () {
    const fileStr = fsExtra.readFileSync(path.join(__dirname, 'comp.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr);
  }

  public fragment () {    
    return `
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    `;
  }
}