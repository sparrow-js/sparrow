const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';
import storage from '../../../../storage';
import Box from '../Box';


export default class Column{
  public uuid = '';
  public components:any = [];
  public $fragment: any;
  name: string = 'column';
  type: number = 0;
  unique: string | number;
  config: any = null;
  insertFileType: string = 'inline';
  boxStrs: string = '';

  constructor () {
    this.uuid = uuid().split('-')[0]; 
    this.config = {
      // 组件自定义配置
      _custom: {
        label: '',
      },
    };
  }
  
  addComponent (data: any) {
    const {type} = data;
    if(type === 'box') {
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
    this.type = storage.get('preview_view_status') || 0;
     // const type = this.storage.get('preview_view_status') || 0;

    // const {tableHeaderData} = this;
    // this.boxStrs = '';

    // const fn = (components) => {
    //   components.forEach(item => {
    //     if (item.vueParse && item.insertFileType === 'inline') {
    //       item.vueParse.methods && this.VueGenerator.appendMethods(item.vueParse.methods);
    //       item.vueParse.data && this.VueGenerator.appendData(item.vueParse.data);
    //     }
    //     if (item.insertComponents && item.insertComponents.length) {
    //       this.VueGenerator.appendComponent(upperCamelCase(item.insertComponents[0]), true);
    //     }
    //     if (item.insertFileType !== 'block' && item.components && item.components.length > 0) {
    //       fn(item.components)
    //     }
    //   })
    // }

    // for (var i = 0; i < tableHeaderData.length; i++) {
    //   const uuid = tableHeaderData[i].uuid;
    //   let compTag = this.renderStep ? '<div />' : '';
    //   if (this.components[uuid]) {
    //     this.components[uuid].forEach(item => {
    //       if (item.name === 'box') {
    //         this.boxStrs = this.boxStrs + item.getFragment().html();
    //         const fragmentOther = item.getFragmentOther();
    //         if (fragmentOther) {
    //           compTag = compTag +  fragmentOther.html();
    //         }
    //       } else {
    //         compTag = compTag + `${item.getFragment().html()}`;
    //       }
    //     })
    //     fn(this.components[uuid]);
    //   }



    //   const curProp = tableHeaderData[i].prop ? `prop="${tableHeaderData[i].prop}"` : '';
    //   let cellBox = '';
    //   if (type === 0) {
    //     cellBox = !curProp ? `
    //       <template slot-scope="{row, column, $index}">
            
    //         ${compTag}
    //         <table-cell-box uuid="${tableHeaderData[i].uuid}"></table-cell-box>
    //       </template>
    //     ` : '';

    //     column += `
    //       <el-table-column 
    //         ${curProp} 
    //         label="${tableHeaderData[i].label}"
    //       >
    //         <template slot="header" slot-scope="{row, column, $index}">
    //           <table-header-box uuid="${tableHeaderData[i].uuid}" :label="column.label"></table-header-box>
    //         </template>
    //         ${cellBox}
    //       </el-table-column>
    //     `;
    //   } else {
    //     cellBox = !curProp && compTag ? `
    //       <template slot-scope="{row, column, $index}">
    //         ${compTag}
    //       </template>
    //     ` : '';

    //     column += `
    //     <el-table-column 
    //       ${curProp}
    //       label="${tableHeaderData[i].label}"
    //     >
    //       ${cellBox}
    //     </el-table-column>
    //   `;
    //   }
    
    // }
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
        compTag = compTag + item.getFragment().html();

      }
    });

     const cellbox =  `
      <template slot-scope="{row, column, $index}">
        ${compTag}
        <table-cell-box uuid="${this.uuid}"></table-cell-box>
      </template>
      `

    this.$fragment =  cheerio.load(`
      <el-table-column
        label="${this.config._custom.label}"
      >
        <template slot="header" slot-scope="{row, column, $index}">
          <table-header-box uuid="${this.uuid}" :label="column.label"></table-header-box>
        </template>
        ${cellbox}
      </el-table-column>  
    `, {
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