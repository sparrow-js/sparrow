const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';
import IBaseBox from '../IBaseBox';

import Base from '../Base';
import Box from '../Box';

export default class Card  extends Base implements IBaseBox{
  public uuid = '';
  $fragment = null;
  public components = [];
  name: string = 'CardBox';
  type: string = 'inline';
  insertFileType: string = 'inline';
  config: any = {};
  _attrStr: string = '';
  labelValue: string = '卡片名称';
  constructor (data: any, storage: any) {
    super(storage);
    this.uuid = uuid().split('-')[0];
    this.config = {
      _attr: {},
      _custom: {
        hasHeader: true,
      },
    };
    this.addBox();
  }

  addBox () {
    this.components.push(new Box());
  }
  

  public renderFragment (type: number) {
    let LogicBox = this.components[0].getFragment().html();

    let labelBox = `
      <label-box 
        label="${this.labelValue}"
        uuid="${this.uuid}"
        :clear-class="true"
      ></label-box>
    `

    if (type === 1) {
      labelBox = `
        <span>${this.labelValue}</span>
      `
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
        <el-card class="box-card">
          ${headerBox}
          <div class="card-content">
            ${LogicBox}
          </div>
        </el-card>
      </div>

    `;

    this.$fragment = cheerio.load(CardBox, {
      xmlMode: true,
      decodeEntities: false,
    });

  }

  setLabel (labelValue: string) {
    this.labelValue = labelValue;
  }
  

  public setConfig (config: any) {
    this.config = config;
  };
  
  public getFragment (type: number) {
    this.renderFragment(type);
    return this.$fragment;
  }


  public getConfig() {
    return this.config
  }

  getSetting () {
    return this.config;
  }

}