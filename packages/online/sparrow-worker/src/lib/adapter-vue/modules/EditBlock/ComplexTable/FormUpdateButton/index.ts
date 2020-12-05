import VueParse from '../../../generator/VueParse';
import Config from '../../../../config';
import Button from '../../../component/Button';
import Template from './tempate';

export default class FormUpdateButton extends Button{
  name: string = 'FormUpdateButton';
  vueParse: any;
  widgetType: string = 'EditBlock';

  constructor (params: any) {
    super(params)
    super(params)
    this.config.model.custom.label = '确定';
    this.config.model.attr['@click'] = 'updateData';
    this.setAttrsToStr();
    this.init();
  }
  
  private init () {
    // const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'EditBlock/ComplexTable/FormUpdateButton',  'index.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, Template.code);
  }
}