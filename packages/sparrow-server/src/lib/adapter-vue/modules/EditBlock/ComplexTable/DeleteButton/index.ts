import * as fsExtra from 'fs-extra';
import VueParse from '../../../generator/VueParse';
import * as path from 'path';
import Config from '../../../../config';
import Button from '../../../component/Button';


export default class DeleteButton extends Button{
  name: string = 'DeleteButton';
  vueParse: any;
  widgetType: string = 'EditBlock';

  constructor (params: any) {
    super(params)
    this.config.model.custom.label = '删除';
    this.config.model.attr.size = 'mini';
    this.config.model.attr.type = 'danger';
    this.config.model.attr['@click'] = 'handleDelete';
    this.setAttrsToStr();
    this.init();
 
  }
  
  private init () {
    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'EditBlock/ComplexTable/DeleteButton',  'index.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr);
  }
}