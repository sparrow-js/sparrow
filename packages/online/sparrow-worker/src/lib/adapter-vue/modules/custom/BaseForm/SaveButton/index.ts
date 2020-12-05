import VueParse from '../../../generator/VueParse';
import Config from '../../../../config';
import Common from '../../Common';
import Template from './template';


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
    this.vueParse = new VueParse(this.uuid, Template.code);
  }

  public fragment () {    
    return `
      <el-button type="primary"  @click="submitForm('form')" style="margin-right: 10px;">
        保存
      </el-button>
    `;
  }
}