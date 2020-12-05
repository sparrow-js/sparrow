import VueParse from '../../../generator/VueParse';
import Button from '../../../component/Button';
import Template from './template';


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
    this.vueParse = new VueParse(this.uuid, Template.code);
  }
}