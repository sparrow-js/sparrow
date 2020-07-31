import * as fsExtra from 'fs-extra';
import VueParse from '../../../generator/VueParse';
import * as path from 'path';
import Config from '../../../../config';
import Common from '../../Common';


export default class SaveButton extends Common{
  name: string = 'SaveButton';
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
    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'component/BaseForm/SaveButton',  'comp.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr);
  }

  public fragment () {    
    return `
      <el-button type="primary"  @click="submitForm('form')" style="margin-right: 10px;">
        保存
      </el-button>
    `;
  }
}