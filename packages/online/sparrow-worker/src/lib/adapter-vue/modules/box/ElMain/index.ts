import * as cheerio from 'cheerio';
import Base from '../Base';
import * as _ from 'lodash';


export default class ElMain extends Base  {
  public components:any = [];
  public $fragment: any;
  name: string = 'ElMain';
  label: string = '';
  previewType: number = 0;
  type:string = 'inline';
  unique: string | number;
  toggle: boolean = false;
  config: any = {};
  params: any = {};

  constructor (data: any, storage: any) {
    super(storage);
    const { params, config } = data;
    this.params = params;
    if (config) {
      this.config = config;
    } else {
      this.config = _.cloneDeep(require('./config'));
    }

    this.setAttrsToStr();

    this.setPreview();
  }


  public setPreview () {
    const type = this.storage.get('preview_view_status') || 0;
    this.previewType = type;
    if (type === 0) {

      this.$fragment = cheerio.load(` 
        <el-main data-design-mode="design-border-box" data-instance-name="${this.name}" ${this._attrStr} class="drag-box" data-id="${this.uuid}">
        </el-main>
      `, {
        xmlMode: true,
        decodeEntities: false
      });
    } else {

      this.$fragment = cheerio.load(` 
        <el-main class="drag-box" ${this._attrStr}></el-main>
      `, {
        xmlMode: true,
        decodeEntities: false
      });
    }
    this.renderBox()
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
  
}