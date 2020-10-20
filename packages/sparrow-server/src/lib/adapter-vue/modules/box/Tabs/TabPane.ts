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
  path: string = '/box/Tabs/TabPane';

  constructor (data: any, storage: any) {
    super(storage);
    this.storage = storage;
    this.uuid = uuid().split('-')[0]; 

    const { config, name } = data;
    if (config) {
      this.config = config;
    } else {
      this.config = _.cloneDeep(require('./tabPaneConfig').default);
      this.config.model.custom.name = name;
      this.config.model.custom.label = name;
    }
    
    this.setAttrsToStr();
  }


  public setPreview () {
    const type = this.storage.get('preview_view_status') || 0;
    this.previewType = type;
    
    if (this.previewType === 0) {
      this.$fragment = cheerio.load(`
        <el-tab-pane
          label="${_.get(this.config, 'model.custom.label')}" 
          name="${_.get(this.config, 'model.custom.name')}"
        >
          <div class="column drag-box" data-design-mode="design-border" data-instance-name="${this.name}" data-id="${this.uuid}"></div>
        </el-tab-pane>
      `, {
        xmlMode: true,
        decodeEntities: false
      });
    } else {
      this.$fragment = cheerio.load(`
        <el-tab-pane
          label="label" 
          name="unique"
        >
          <div class="column drag-box"></div>
        </el-tab-pane>
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
  
  getFragment () {
    this.renderBox();
    return this.$fragment;
  }
}