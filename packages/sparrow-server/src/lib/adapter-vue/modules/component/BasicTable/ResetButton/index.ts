import * as fsExtra from 'fs-extra';
import VueParse from '../../../generator/VueParse';
import * as path from 'path';
import Base from '../Base';
import Config from '../../../../config';

export default class ResetButton extends Base{
  name: string = 'ResetButton';
  params: any;
  vueParse: any;
  uuid: string;
  constructor () {
    super()
    this.init();
  }
  
  private init () {
    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'component/BasicTable/ResetButton',  'comp.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr);
  }

  public fragment () {    
    return `
      <el-button class="filter-item" type="default" @click="handleReset" style="margin-right: 10px;">
        重置
      </el-button>
    `;
  }
}