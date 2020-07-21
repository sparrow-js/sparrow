const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';
import storage from '../../../../storage';
import Box from '../Box';


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
        <div class="logic-box">test</div>
      </el-col>
    `, {
      xmlMode: true,
      decodeEntities: false
    });

  }
  
  addComponent (data: any) {
    const {params} = data;
    const dynamicObj = require(`../../component/Table/${data.id}`).default;
    const obj = new dynamicObj(data, storage)
    this.components.push(obj);
    this.renderTemplate();
  }

  renderTemplate () {
    this.previewType = storage.get('preview_view_status') || 0;
    this.components.forEach(item => {
      this.$fragment('.logic-box').append(item.getFragment(this.previewType).html())
    })
  }

  getConfig() {
    return this.config;
  }

  public setConfig (config: any) {
    this.config = config;
  }

  
  getFragment () {
    this.renderTemplate();
    return this.$fragment;
  }

  getFragmentOther () {
    if (this.components[0]) {
      return this.components[0].getFragmentOther(); 
    }
    return null;
  }
}