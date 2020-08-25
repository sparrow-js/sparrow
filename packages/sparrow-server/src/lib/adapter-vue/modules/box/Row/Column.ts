const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';
import * as _ from 'lodash';
import Base from '../Base';

export default class Column extends Base{
  public uuid = '';
  public components:any = [];
  public $fragment: any;
  name: string = 'column';
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
    this.uuid = uuid().split('-')[0]; 

    const {span} = data;
    if (data.initType === 'auto') {
      this.config = data;
    } else {
      this.config = _.cloneDeep(require('./config').default);
      if (span) {
        this.config.model.attr[':span'] = span;
      }
    }
    
    this.setAttrsToStr();
    this.setPreview();
  }


  public setPreview () {
    const type = this.storage.get('preview_view_status') || 0;
    this.previewType = type;
    if (this.previewType === 0) {
      this.$fragment = cheerio.load(`
        <el-col ${this._attrStr}>
          <box 
            data-id="${this.uuid}"
            :uuid="'${this.uuid}'" 
            class="block-item" 
            label="column"
          >
            <div class="column drag-box" data-id="${this.uuid}"></div>
          </box>
        </el-col>
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
      this.$fragment('.drag-box').first().append(`<div class="empty-container">empty</div>`)
    }
  }
  
  getFragment () {
    this.renderBox();
    return this.$fragment;
  }

}