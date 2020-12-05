import * as cheerio from 'cheerio';
import * as _ from 'lodash';
import Base from '../Base';

export default class Column extends Base{
  public uuid = '';
  public components:any = [];
  public $fragment: any;
  name: string = 'column';
  alias: string = 'col';
  previewType: number = 0;
  unique: string | number;
  config: any = null;
  boxStrs: string = '';
  storage: any = {};
  type: string = 'inline';
  path: string = '/box/Row/Column';

  constructor (data: any, storage: any) {
    super(storage);
    this.storage = storage;
    const { params = {}, config = {}} = data;
    if (config.initType === 'auto') {
      this.config = config;
    } else {
      const {span} = data;
      this.config = _.cloneDeep(require('./config'));
      if (span) {
        this.config.model.attr[':span'] = span;
      }
    }
    
    this.setAttrsToStr();
    this.setPreview();
  }


  public setPreview () {
    const type = this.storage.get('preview_view_status').value() || 0;
    this.previewType = type;
    if (this.previewType === 0) {
      this.$fragment = cheerio.load(`
        <el-col ${this._attrStr} class="column drag-box"  data-design-mode="design-border" data-instance-name="${this.name}" data-id="${this.uuid}"></el-col>
      `, {
        xmlMode: true,
        decodeEntities: false
      });
    } else {
      this.$fragment = cheerio.load(`
        <el-col ${this._attrStr}>
          <div class="column drag-box"></div>
        </el-col>
      `, {
        xmlMode: true,
        decodeEntities: false
      });
    }
    this.renderBox();
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