import VueParse from '../../../generator/VueParse';
import Config from '../../../../config';
import Common from '../../Common';
import Template from './template';

export default class ResetButton extends Common{
  name: string = 'ResetButton';
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
    // const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'component/BaseForm/ResetButton',  'comp.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, Template.code);
  }

  public fragment () {    
    return `
      <el-button @click="resetForm('form')" style="margin-right: 10px;">
        重置
      </el-button>
    `;
  }
}