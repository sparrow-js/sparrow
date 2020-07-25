const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';
import storage from '../../../../storage';
import Container from '../Container'; 

export default class Column{
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

  constructor (data: any, storage: any) {
    this.storage = storage;
    this.uuid = uuid().split('-')[0]; 
    
    this.$fragment = cheerio.load(`
      <el-col :span="12">
        <div class="column"></div>
      </el-col>
    `, {
      xmlMode: true,
      decodeEntities: false
    });
    this.addComponent();
  }
  
  addComponent () {
    const curBox = new Container({}, this.storage)
    this.components.push(curBox);
    return curBox;
  }

  renderBox () {
    this.$fragment('.column').first().empty();
    this.previewType = storage.get('preview_view_status') || 0;
    let LogicBox = this.components[0].getFragment().html();
    this.$fragment('.column').first().append(LogicBox);
  }

  getConfig() {
    return this.config;
  }

  public setConfig (config: any) {
    this.config = config;
  }

  
  getFragment () {
    this.renderBox();
    return this.$fragment;
  }

  getFragmentOther () {
    if (this.components[0]) {
      return this.components[0].getFragmentOther(); 
    }
    return null;
  }
}