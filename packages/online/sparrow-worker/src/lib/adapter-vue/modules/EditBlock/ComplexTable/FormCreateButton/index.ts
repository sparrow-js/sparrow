import VueParse from '../../../generator/VueParse';
import Config from '../../../../config';
import Button from '../../../component/Button';
import Template from './tempate';

export default class FormCreateButton extends Button{
  name: string = 'FormCreateButton';
  vueParse: any;
  widgetType: string = 'EditBlock';

  constructor (params: any) {
    super(params)
    this.config.model.custom.label = '确定';
    this.config.model.attr['@click'] = 'createData';
    this.setAttrsToStr();
    this.init();
  }
  
  private init () {
    // const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'EditBlock/ComplexTable/FormCreateButton',  'index.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, Template.code);
  }
}