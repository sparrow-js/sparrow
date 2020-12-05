import VueParse from '../../../generator/VueParse';
import Config from '../../../../config';
import Button from '../../../component/Button';
import Template from './tempate';

export default class StatusButton extends Button{
  name: string = 'StatusButton';
  vueParse: any;
  widgetType: string = 'EditBlock';

  constructor (params: any) {
    super(params)
    this.config.model.custom.label = '发布';
    this.config.model.attr.size = 'mini';
    this.config.model.attr['@click'] = `handleModifyStatus(row,'published')`;
    this.setAttrsToStr();
    this.init();
  }
  
  private init () {
    // const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'EditBlock/ComplexTable/StatusButton',  'index.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, Template.code);
  }
}