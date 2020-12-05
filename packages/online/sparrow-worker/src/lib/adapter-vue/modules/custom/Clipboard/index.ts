import Common from '../Common';
import VueParse from '../../generator/VueParse';
import Config from '../../../config';
import Template from './template';

export default class Clipboard extends Common{
  name: string = 'Clipboard';
  params: any;
  vueParse: any;
  type: string;
  config: any;
  constructor (params: any = {}) {
    super();
    this.init();
  }
  
  private init () {
    // const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'Custom/Clipboard', 'comp.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, Template.code);
  }

  public fragment () {
    return `
      <el-button type="primary" icon="el-icon-document" @click="handleCopy('clipboard',$event)">
        copy
      </el-button>
    `;
  }
}