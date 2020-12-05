import { v4 as uuid } from '@lukeed/uuid';
import * as cheerio from 'cheerio';
import Base from '../Base';
import * as _ from 'lodash';


export default class Column extends Base{
  public components:any = [];
  public $fragment: any;
  name: string = 'column';
  alias: string = 'col';
  previewType: number = 0;
  config: any = null;
  type: string = 'inline';
  path: string = '/box/Table/column';

  constructor (data: any, storage: any) {
    super(storage);
    const {config = {}} = data;
    if (config.initType === 'auto') {
      this.config = config;
    } else {
      this.config =  _.cloneDeep(require('./columnConfig'));
    }
    this.setAttrsToStr();
  }

  setPreview () {
    this.previewType = this.storage.get('preview_view_status').value() || 0;
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
          ${expandStr ? '<div />' : ''}
          ${value}
          <div class="drag-box" data-design-mode="design-border" data-instance-name="${this.name}" data-id="${this.uuid}" ></div>
        `;
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