import VueParse from '../../../generator/VueParse';
import Button from '../../../component/Button';
import Template from './tempate';

export default class CreateButton extends Button{
  name: string = 'CreateButton';
  vueParse: any;
  widgetType: string = 'EditBlock';

  constructor (params: any) {

    super(params)
    this.init();
    this.config.model.custom.label = '添加';
    this.config.model.attr['@click'] = 'handleCreate';
    this.setAttrsToStr();
  }
  
  private init () {
    // const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'EditBlock/ComplexTable/CreateButton',  'index.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, Template.code);
  }
}