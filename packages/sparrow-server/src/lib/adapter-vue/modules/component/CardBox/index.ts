const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';

export default class CardBox{
  public uuid = '';
  $fragment = null;
  public components = [];
  name: string = 'CardBox';
  type: string  = 'box';
  config: any = {};
  _attrStr: string = '';
  labelValue: string = '卡片名称';
  constructor (params: any) {
    this.uuid = uuid().split('-')[0];
    if (params.initType === 'auto') {
      this.config = params;
    } else {
      this.config = {
        _attr: {},
        _custom: {
          hasHeader: true,
        },
      };
    }
  }
  

  public renderFragment (type: number) {
    let LogicBox = `
      <logic-box  
        :uuid="'${this.uuid}'" 
        :label="'card'"
      ></logic-box>
    `;

    let labelBox = `
      <label-box 
        label="${this.labelValue}"
        uuid="${this.uuid}"
        :clear-class="true"
      ></label-box>
    `

    if (type === 1) {
      LogicBox = '';
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

  public addComponent (data: any, type: string = 'manual') {
    if (type === 'manual') {
      const { id, name, params } = data;
      const dynamicObj = require(`../../component/${id}`).default;
      if (name) {
        params['v-model'] = name;
      }  
      this.components.push(new dynamicObj(params));
    } else {
      console.log('***222****');
      let { id, config } = data;
      config.initType = type;
      const dynamicObj = require(`../../component/${id}`).default;
      const instance = new dynamicObj(config)
      this.components.push(instance);
      if (instance.type === 'box') {
        return instance;
      } else {
        return null;
      }
    }
 
  }


  public setAttrsToStr () {
    const {config} = this;
    if (config._attr) {
      const formField = [];
      Object.keys(config._attr).forEach(key => {
        formField.push(`${key}="${config._attr[key]}"`);
      });
      this._attrStr = formField.join(' ');
    }
  }
  
  public getFragment (type: number) {
    this.renderFragment(type);
    this.renderBox(type);
    return this.$fragment;
  }

  private renderBox (type) {
    this.components.forEach((component, index) => {
      if (type === 0) {
        this.$fragment('logic-box').append(
          `<component-box indexcomp="${index}" uuid="${component.uuid}">
            ${component.getFragment(type).html()}
          </component-box>`
        );
      } else {
        this.$fragment('.card-content').append(component.getFragment(type).html());
      }
    });
  }

  public getConfig() {
    return this.config
  }

}