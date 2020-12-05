import VueParse from '../../../generator/VueParse';
import Button from '../../../component/Button';
import Template from './template';


export default class SaveButton extends Button{
  name: string = 'SaveButton';
  vueParse: any;
  widgetType: string = 'EditBlock';

  constructor (params: any) {
    super(params)
    this.init();
    this.config.model.custom.label = '保存';
    this.config.model.attr.size = 'mini';
    this.config.model.attr.type = 'success';
    this.config.model.attr['@click'] = 'saveRow(row)';
    this.setAttrsToStr();
  }
  
  private init () {
    // const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'EditBlock/AdvancedTable/SaveButton',  'index.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, Template.code);
  }
}