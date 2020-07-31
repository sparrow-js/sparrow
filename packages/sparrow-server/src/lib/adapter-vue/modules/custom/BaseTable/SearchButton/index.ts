import * as fsExtra from 'fs-extra';
import VueParse from '../../../generator/VueParse';
import * as path from 'path';
import Config from '../../../../config';
import Common from '../../Common';

export default class SearchButton extends Common{
  name: string = 'SearchButton';
  params: any;
  vueParse: any;
  uuid: string;
  constructor () {
    super()
    this.init();
  }
  
  private init () {
    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'component/BasicTable/SearchButton', 'comp.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr);
  }

  public fragment () {    
    return `
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter" style="margin-right: 10px;">
        搜索
      </el-button>
    `;
  }
}