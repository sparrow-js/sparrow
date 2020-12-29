import * as cheerio from 'cheerio';
import Base from '../Base';
import * as _ from 'lodash';
import VueParse from '../../generator/VueParse';
import Config from '../../../config';

export default class List extends Base  {
  public components:any = [];
  public $fragment: any;
  name: string = 'List';
  alias: string = 'List';
  label: string = '';
  previewType: number = 0;
  type:string = 'inline';
  unique: string | number;
  toggle: boolean = false;
  config: any = {};
  params: any = {};
  styleStr: string = '';
  vueParse: any = {};

  constructor (data: any, storage: any) {
    super(storage);
    const { params, config } = data;
    this.params = params;
    if (config) {
      this.config = config;
    } else {
      this.config = _.cloneDeep(require('./config'));
    }

    // const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'box/list', 'index.vue'), 'utf8');
    // this.vueParse = new VueParse(this.uuid, fileStr); 

    this.setAttrsToStr();
    this.setPreview();
    this.customAttrHandler();
  }


  public setPreview () {
    const type = this.storage.get('preview_view_status') || 0;
    this.previewType = type;
    if (type === 0) {

      this.$fragment = cheerio.load(` 
        <ul class="list list-split">
          <li class="list-item drag-box clearfix" data-design-mode="design-border-box" data-instance-name="${this.name}" data-id="${this.uuid}" ${this._attrStr} ${this.styleStr}></li>
        </ul>
        `, {
        xmlMode: true,
        decodeEntities: false
      });
    } else {

      this.$fragment = cheerio.load(` 
      <ul class="list list-split">
        <li class="list-item drag-box" ${this._attrStr} ${this.styleStr}></li>
      </ul>
      `, {
        xmlMode: true,
        decodeEntities: false
      });
    }
    this.renderBox()
  }

  public customAttrHandler () {
    const custom = _.get(this.config, 'model.custom');
    const styleKeys = [
      'display',
      'flex-direction',
      'justify-content',
      'align-items',
      'flex-wrap',
      'style',
    ];

    const styleArr = [];
    
    styleKeys.forEach(key => {
      if (key === 'style') {
        styleArr.push(custom[key]);
        return;
      }
      if (custom[key]) {
        styleArr.push(`${key}: ${custom[key]}`);
      }
    });
    if (styleArr.length > 0) {
      this.styleStr = `style="${styleArr.join(';')}"`
    }    
  }

  public renderBox () {
    this.$fragment('.drag-box').first().empty();
    this.components.forEach(component => {
      this.$fragment('.drag-box').first().append(component.getFragment(this.previewType).html());
    });

    if (this.components.length  === 0) {
      this.$fragment('.drag-box').attr('data-empty', true);
    }

  }

  getFragment () {
    this.renderBox();
    return this.$fragment;
  }
}