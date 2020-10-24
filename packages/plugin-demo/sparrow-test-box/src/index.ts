import * as cheerio from 'cheerio';
import * as _ from 'lodash';
import {Box} from '@sparrow-vue/sparrow-utils';


export default class SparrowTestBox extends Box{
  public components:any = [];
  public $fragment: any;
  name: string = 'sparrow-test-box';
  alias: string = 'box';
  label: string = '';
  previewType: number = 0;
  type:string = 'inline';
  unique: string | number;
  toggle: boolean = false;
  config: any = {};
  params: any = {};
  styleStr: string = '';

  constructor (data: any, storage: any, globalConfig: any) {
    super(storage, globalConfig);
    const { params, config } = data;
    this.params = params;
    if (config) {
      this.config = config;
    } else {
      this.config = _.cloneDeep(require('./config').default);
    }

    this.setAttrsToStr();
    this.setPreview();
  }


  public setPreview () {
    const type = this.storage.get('preview_view_status') || 0;
    this.previewType = type;
    if (type === 0) {

      this.$fragment = cheerio.load(` 
        <div class="drag-box clearfix" data-design-mode="design-border" data-instance-name="${this.name}" data-id="${this.uuid}" ${this._attrStr} ${this.styleStr}></div>
      `, {
        xmlMode: true,
        decodeEntities: false
      });
    } else {

      this.$fragment = cheerio.load(` 
        <div class="drag-box" ${this._attrStr} ${this.styleStr}></div>
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