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
  
  addComponent (data: any) {
    const {params} = data;
    if(params.type === 'box') {
      const box = new Box();
      data.displayMode = 'table';
      box.addComponent(data);
      this.components.push(box);
    }  else {
      const dynamicObj = require(`../../component/Table/${data.id}`).default;
      const obj = new dynamicObj(data, storage)
      this.components.push(obj);
    }


    this.renderTemplate();
  }

  renderTemplate () {
    this.previewType = storage.get('preview_view_status') || 0;
    let compTag = '';
    this.boxStrs = '';
    this.components.forEach(item => {
      if (item.name === 'box') {
        this.boxStrs = this.boxStrs + item.getFragment().html();

        const fragmentOther = item.getFragmentOther();
        if (fragmentOther) {
          compTag = compTag +  fragmentOther.html();
        }
      } else {
        compTag = compTag + item.getFragment(this.previewType).html();
      }

    });

    let column = '';
    if (this.previewType === 0) {
      const cellbox =  `
      <template slot-scope="{row, column, $index}">
        ${compTag}
        <table-cell-box uuid="${this.uuid}"></table-cell-box>
      </template>
      `
      column = `
        <el-table-column
          label="${this.config._custom.label}"
        >
          <template slot="header" slot-scope="{row, column, $index}">
            <table-header-box uuid="${this.uuid}" :label="column.label"></table-header-box>
          </template>
          ${cellbox}
        </el-table-column>  
      `
    } else {
      const cellbox =  `
      <template slot-scope="{row, column, $index}">
        ${compTag}
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