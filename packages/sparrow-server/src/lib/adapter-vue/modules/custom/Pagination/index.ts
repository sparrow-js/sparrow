import Common from '../Common';
import * as fsExtra from 'fs-extra';
import VueParse from '../../generator/VueParse';
import * as path from 'path';
import Config from '../../../config';

export default class Pagination extends Common{
  name: string = 'Pagination';
  vueParse: any;

  constructor (data: any) {
    super();
    // this.init();
  }

  private init () {
    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'scene/BaseTable', 'index.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr);
  }


  public fragment () {
    const type = this.storage.get('preview_view_status') || 0;
    if (type === 0) {
      return `
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      `;
    } else {
      return `
        <div class="custom-inline">
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </div>`;
    }
  }

}