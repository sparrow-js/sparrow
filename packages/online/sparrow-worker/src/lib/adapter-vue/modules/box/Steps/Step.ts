const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';
import * as _ from 'lodash';
import Base from '../Base';

export default class Step extends Base{
  public components:any = [];
  public $fragment: any;
  name: string = 'Step';
  previewType: number = 0;
  unique: string | number;
  config: any = null;
  boxStrs: string = '';
  storage: any = {};
  path: string = '/box/Steps/Step';

  constructor (data: any, storage: any) {
    super(storage);
    this.storage = storage;

    const { config } = data;
    if (config) {
      this.config = config;
    } else {
      this.config = _.cloneDeep(require('./stepConfig').default);
    }

    this.setAttrsToStr();
  }


  public setPreview () {
    const type = this.storage.get('preview_view_status') || 0;
    this.previewType = type;
    
    if (this.previewType === 0) {
      this.$fragment = cheerio.load(`
        <el-step>
          <edit-text-box slot="title" :clearClass="true" uuid="${this.uuid}">
            ${this.config.model.custom.label}
          </edit-text-box>
          <box
            data-id="${this.uuid}"
            :uuid="'${this.uuid}'" 
            class="block-item" 
            label="TabPane"
          >
            <div class="column drag-box" data-id="${this.uuid}"></div>
          </box>
        </el-step>
      `, {
        xmlMode: true,
        decodeEntities: false
      });
    } else {
      this.$fragment = cheerio.load(`
        <el-step title="步骤 1">
          <div class="column drag-box"></div>
        </el-step>
      `, {
        xmlMode: true,
        decodeEntities: false
      });
    }
    this.renderBox();

  }  

  public renderBox () {
    this.$fragment('.drag-box').empty();
    this.components.forEach(component => {
      this.$fragment('.drag-box').append(component.getFragment(this.previewType).html());
    });

    if (this.components.length  === 0) {
      this.$fragment('.drag-box').attr('data-empty', true);
    }
  }

  public insertEditText (params) {
    this.config.model.custom.label = params.value;
  }
  
  getFragment () {
    this.renderBox();
    return this.$fragment;
  }
}