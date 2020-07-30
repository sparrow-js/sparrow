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
    if (data.config) {
      this.config = data.config;
    } else {
      this.config = {
        // 组件自定义配置
        _custom: {
          label: '',
        },
      };
    }
    // this.addComponent();
  }

  addComponent () {
    const curBox = new Container({}, this.storage)
    this.components.push(curBox);
    return curBox;
  }

  renderTemplate () {
    this.previewType = storage.get('preview_view_status') || 0;
    let containerBox = this.components[0].getFragment().html();
    let column = '';
    if (this.previewType === 0) {
      const cellbox =  `
      <template slot-scope="{row, column, $index}">
        ${containerBox}
      </template>
      `
      column = `
        <el-table-column
          label="${this.config._custom.label}"
        >
          <template slot="header" slot-scope="{row, column, $index}">
            <edit-text-box uuid="${this.uuid}" :label="column.label"></edit-text-box>
          </template>
          ${cellbox}
        </el-table-column>  
      `
    } else {
      const cellbox =  `
      <template slot-scope="{row, column, $index}">
        ${containerBox}
      </template>
      `
      column = `
        <el-table-column
          label="${this.config._custom.label}"
        >
          ${cellbox}
        </el-table-column>  
      `
    }
   
    this.$fragment =  cheerio.load(column, {
      xmlMode: true,
      decodeEntities: false
    });
  }

  getConfig() {
    return this.config;
  }

  public settingConfig (config: any) {
    this.config = config;
  }

  public insertEditText (params) {
    this.config._custom.label = params.value;
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