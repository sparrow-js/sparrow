import VueParse from '../../../generator/VueParse';
import Config from '../../../../config';
import Button from '../../../component/Button';
import Template from './tempate';

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
    // const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'EditBlock/ComplexTable/DeleteButton',  'index.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, Template.code);
  }
}