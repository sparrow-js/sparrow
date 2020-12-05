import VueParse from '../../generator/VueParse';
import Config from '../../../config';
import Base from '../../box/Base'
import * as cheerio from 'cheerio';
import Template from './template';

export default class Sticky extends Base{
  name: string = 'Sticky';
  params: any;
  vueParse: any;
  type: string;
  config: any;
  widgetType: string = 'custom';

  constructor (data: any, storage: any) {
    super(storage);
    this.init();
  }
  
  private init () {
    // const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'Custom/Sticky', 'index.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, Template.code);
  }

  public setPreview (type: number) {    
    const DialogBox = `
        <sticky :z-index="10" class-name="sub-navbar">
          <div class="dialog-content drag-box" data-id="${this.uuid}"></div>
        </ sticky>
    `;

    this.$fragment = cheerio.load(DialogBox, {
      xmlMode: true,
      decodeEntities: false,
    });
    this.renderComp();
  }
}