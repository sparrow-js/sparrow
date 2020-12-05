import VueParse from '../../../generator/VueParse';
import Button from '../../../component/Button';
import Template from './template';


export default class CancelButton extends Button{
  name: string = 'CancelButton';
  vueParse: any;
  widgetType: string = 'EditBlock';

  constructor (params: any) {
    super(params)
    this.config.model.custom.label = '取消';
    this.config.model.attr.size = 'mini';
    this.config.model.attr.type = 'warning';
    this.config.model.attr['@click'] = 'cancel(row.id)';
    this.setAttrsToStr();
    this.init();
  }
  
  private init () {
    this.vueParse = new VueParse(this.uuid, Template.code);
  }
}