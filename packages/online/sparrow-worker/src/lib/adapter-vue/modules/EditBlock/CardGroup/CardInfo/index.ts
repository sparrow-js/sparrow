import * as cheerio from 'cheerio';
import VueParse from '../../../generator/VueParse';
import Config from '../../../../config';
import Base from '../../BaseEditBlock'
import Template from './template';

export default class CardInfo extends Base{
  name: string = 'CardInfo';
  params: any;
  vueParse: any;
  uuid: string;
  type: string;
  config: any;
  components: any = [];

  constructor (params: any = {}, storage) {
    super(storage);
    const {config = {}} = params;
    this.init();
  }


  private init () {
    // const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'EditBlock/CardPanel/CardInfo', 'comp.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, Template.code);
  }

  public setPreview () {
    this.$fragment = cheerio.load( `
      <div class="drag-box card-meta-detail"></div>
    `, {
      xmlMode: true,
      decodeEntities: false,
    });

    this.renderComp();
  }

  public fragment () {
   
  }
}