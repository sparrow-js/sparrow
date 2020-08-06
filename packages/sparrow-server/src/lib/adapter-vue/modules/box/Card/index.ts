const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';
import IBaseBox from '../IBaseBox';
import Container from '../Container'


export default class Card implements IBaseBox{
  public uuid = '';
  $fragment = null;
  public components = [];
  name: string = 'Card';
  type: string = 'inline';
  insertFileType: string = 'inline';
  config: any = {};
  _attrStr: string = '';
  labelValue: string = '卡片名称';
  storage: any = null;
  constructor (data: any, storage: any) {
    this.uuid = uuid().split('-')[0];
    const { config } = data;
    this.storage = storage;
    if (config) {
      this.config = config
    } else {
      this.config = {
        _attr: {
          label: '卡片名称'
        },
        _custom: {
          hasHeader: true,
        },
      };
      this.addComponent();
    }
  
  }

  addComponent () {
    const curBox = new Container({}, this.storage)
    this.components.push(curBox);
    return curBox;
  }
  

  public renderBox () {
    if (!this.components[0]) return;
    const {_attr} = this.config;
    let LogicBox = this.components[0].getFragment().html();

    const type = this.storage.get('preview_view_status') || 0;
    let labelBox = `
      <edit-text-box :clearClass="true" uuid="${this.uuid}">
        ${_attr['label']}
      </edit-text-box>
    `;

    if (type === 1) {
      labelBox = `
        <span>${_attr['label']}</span>
      `;
    }

    let headerBox = '';

    if (this.config._custom.hasHeader === true) {
      headerBox = `
        <div slot="header" class="clearfix">
          ${labelBox}
        </div>
      `;
    }
    
    let CardBox = `
      <div style="margin-bottom: 20px;">
        <config-box>
          <el-card class="box-card">
            ${headerBox}
            <div class="card-content">
              ${LogicBox}
            </div>
          </el-card>
        </config-box>
      </div>
    `;

    if (type === 1) {
      CardBox = `
        <div style="margin-bottom: 20px;">
          <el-card class="box-card">
            ${headerBox}
            <div class="card-content">
              ${LogicBox}
            </div>
          </el-card>
        </div>
      `;
    }

    this.$fragment = cheerio.load(CardBox, {
      xmlMode: true,
      decodeEntities: false,
    });

  }

  public setConfig (config: any) {
    this.config = config;
  };
  
  public getFragment () {
    this.renderBox();
    return this.$fragment;
  }


  public getConfig() {
    return this.config
  }

  public insertEditText (params) {
    this.config._attr.label = params.value;
  }

  setting (data: any) {
    const {config} = data;
    this.config = config;
  }

}