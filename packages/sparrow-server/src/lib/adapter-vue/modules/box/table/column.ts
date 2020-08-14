const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';
import storage from '../../../../storage';
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

  constructor (data: any, storage: any) {
    super(storage);
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
  }

  setPreview () {
    this.previewType = storage.get('preview_view_status') || 0;
    let containerBox = `<div class="drag-box"></div>`;
    let column = '';
    if (this.previewType === 0) {
      containerBox = ` 
        <box 
          data-id="${this.uuid}"
          :uuid="'${this.uuid}'" 
          class="block-item" 
          label="column"
        >
          <div class="drag-box"></div>
        </box>`;
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
    this.renderComp();
  }

  public insertEditText (params) {
    this.config._custom.label = params.value;
  }

  getFragment () {
    return this.$fragment;
  }

}