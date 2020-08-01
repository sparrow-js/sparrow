const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';
import storage from '../../../../storage';
import Base from '../Base';

export default class Container extends Base  {
  public uuid = '';
  public components:any = [];
  public $fragment: any;
  name: string = 'Container';
  label: string = '';
  previewType: number = 0;
  type:string = 'inline';
  unique: string | number;
  toggle: boolean = false;
  config: any = {};
  storage: any = null;

  constructor (data: any, storage: any) {
    super(storage);
    this.uuid = uuid().split('-')[0]; 
    this.storage = storage;
    this.$fragment = cheerio.load(` 
      <div>
        <div class="drag-box" data-id="${this.uuid}"></div>
      </div>
    `, {
      xmlMode: true,
      decodeEntities: false
    });
  }


  public setPreview () {
    const type = this.storage.get('preview_view_status') || 0;
    if (this.previewType === type) {
      this.renderBox();
      return;
    }
    this.previewType = type;
    if (type === 0) {

      this.$fragment = cheerio.load(` 
        <div>
          <div class="drag-box" data-id="${this.uuid}"></div>
        </div>
      `, {
        xmlMode: true,
        decodeEntities: false
      });
    } else {

      this.$fragment = cheerio.load(` 
        <div class="drag-box"></div>
      `, {
        xmlMode: true,
        decodeEntities: false
      });
    }
    this.renderBox()
  }


  public renderBox () {
    this.$fragment('.drag-box').empty();
    this.components.forEach(component => {
      this.$fragment('.drag-box').append(component.getFragment(this.previewType).html());
    });

    if (this.components.length  === 0) {
      this.$fragment('.drag-box').append(`<div class="empty-container">empty</div>`)
    }

  }
  
}