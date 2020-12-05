import Common from '../../Common';
import * as cheerio from 'cheerio';
import VueParse from '../../../generator/VueParse';
import Config from '../../../../config';
import EditText from '../../../component/EditText';
import SvgIcon from '../SvgIcon';
import BaseEditBlock from '../../BaseEditBlock';
import Template from './template';

export default class CardPanel extends BaseEditBlock{
  name: string = 'CardPanel';
  params: any;
  vueParse: any;
  uuid: string;
  type: string;
  config: any;
  components: any = [];

  constructor (params: any = {}, storage) {
    super(storage);
    this.init();
    if (params.initType !== 'auto') {
      this.initComp();
    }
  }

  private initComp () {
    this.components.push(new EditText({}));
    this.components.push(new SvgIcon({}));
  }

  private init () {
    this.vueParse = new VueParse(this.uuid, Template.code);
  }
  public setPreview () {
    const findEditText = this.components.find(item => item.name === 'EditText');
    const findSvgIcon = this.components.find(item => item.name === 'SvgIcon');
    this.$fragment = cheerio.load( `
    <div class="card-panel card-panel-col">
      ${findSvgIcon.getFragment().html()}
      <div class="card-panel-description">
        <div class="card-panel-text">
          ${findEditText.getFragment().html()}
        </div>
        <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
      </div>
    </div>
  `, {
      xmlMode: true,
      decodeEntities: false,
    });
  }

  public fragment () {
   
  }
}