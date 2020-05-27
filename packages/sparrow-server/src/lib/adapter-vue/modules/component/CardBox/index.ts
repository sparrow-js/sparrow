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
  constructor () {
    this.uuid = uuid().split('-')[0];
    this.config = {
      _attr: {},
    };
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

    let CardBox = `
      <div style="margin-bottom: 20px;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            ${labelBox}
          </div>
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

  public setConfig () {

  };

  public addComponent (data: any) {
    const { key, name, params } = data;
    const dynamicObj = require(`../../component/${key}`).default;
    const componentIndex = this.components.length;
    this.components.push(new dynamicObj({
      'v-model': name,
    }, componentIndex, params));
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