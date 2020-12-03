import * as fsExtra from 'fs-extra';
import VueParse from '../../../generator/VueParse';
import * as path from 'path';
import Config from '../../../../config';
import Button from '../../../component/Button';


export default class NewButton extends Button{
  name: string = 'NewButton';
  vueParse: any;
  isInline: boolean = false; 
  widgetType: string = 'EditBlock';

  constructor (params: any) {

    super(params)
    this.init();
    this.config.model.custom.label = '新增';
    this.config.model.attr.style = 'width: 100%;margin-top: 10px;';
    this.config.model.attr['@click'] = 'newMember';
    this.config.model.attr.icon = 'el-icon-plus';
    this.config.model.attr.type = '';
    this.setAttrsToStr();
  }
  
  private init () {
    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'EditBlock/AdvancedTable/NewButton',  'index.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr);
  }
}