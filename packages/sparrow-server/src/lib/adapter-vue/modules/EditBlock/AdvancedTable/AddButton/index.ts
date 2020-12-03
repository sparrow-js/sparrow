import * as fsExtra from 'fs-extra';
import VueParse from '../../../generator/VueParse';
import * as path from 'path';
import Config from '../../../../config';
import Button from '../../../component/Button';


export default class AddButton extends Button{
  name: string = 'AddButton';
  vueParse: any;
  widgetType: string = 'EditBlock';

  constructor (params: any) {
    super(params)
    this.config.model.custom.label = '添加';
    this.config.model.attr.size = 'mini';
    this.config.model.attr.type = 'primary';
    this.config.model.attr['@click'] = 'saveRow(row)';
    this.setAttrsToStr();
    this.init();
  }
  
  private init () {
    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'EditBlock/AdvancedTable/AddButton',  'index.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr);
  }
}