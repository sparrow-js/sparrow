const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';
import storage from '../../../../storage';
import Base from '../Base';
import * as _ from 'lodash';


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
  path: string = '/box/Table/column';


  constructor (data: any, storage: any) {
    super(storage);
    this.storage = storage;
    this.uuid = uuid().split('-')[0]; 
    if (data.initType === 'auto') {
      this.config = data;
    } else {
      this.config =  _.cloneDeep(require('./columnConfig').default);
    }
    this.setAttrsToStr();
  }

  setPreview () {
    this.previewType = storage.get('preview_view_status') || 0;
    const type = _.get(this.config, 'model.custom.type');
    let value = _.get(this.config, 'model.custom.value') || '';
    if (value) {
      value = `{{ ${value} }}`;
    }

    let column = '';
    let expandStr = '';
    if (type === 'expand') {
      expandStr = `type="${type}"`
    }
    
    let containerBox = `<div class="drag-box"></div>`;


    if (this.previewType === 0) {
      containerBox = ` 
        <box 
          data-id="${this.uuid}"
          :uuid="'${this.uuid}'" 
          class="block-item" 
          label="column"
        >
          ${expandStr ? '<div />' : ''}
          ${value}
          <div class="drag-box" data-id="${this.uuid}"></div>
        </box>`;
      const cellbox = `
      <template slot-scope="{row, column, $index}">
        ${containerBox}
      </template>
      `
      column = `
        <el-table-column
          ${this._attrStr}
          ${expandStr}
          label="${_.get(this.config, 'model.custom.label')}"
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
        ${value}
        ${containerBox}
      </template>
      `
      column = `
        <el-table-column
          ${this._attrStr}
          ${expandStr}
          label="${_.get(this.config, 'model.custom.label')}"
        >
          ${cellbox}
        </el-table-column>  
      `
    }


    if (type === 'index' || type === 'selection') {
      column = `
        <el-table-column
          ${this._attrStr}
          type="${type}"
          label="${_.get(this.config, 'model.custom.label')}"
        >
        </el-table-column>  
      `;
    }
   
    this.$fragment =  cheerio.load(column, {
      xmlMode: true,
      decodeEntities: false
    });
    this.renderComp();
  }

  public insertEditText (params) {
    this.config.model.custom.label = params.value;
  }

  getFragment () {
    return this.$fragment;
  }

}