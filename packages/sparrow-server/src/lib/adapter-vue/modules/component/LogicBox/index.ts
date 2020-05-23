const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';

export default class LogicBox{
  public uuid = '';
  $fragment = null;
  public components = [];
  name: string = 'LogicBox';
  type: string  = 'box';
  config: any = {};
  _attrStr: string = '';
  constructor () {
    this.uuid = uuid().split('-')[0];
    this.config = {
      _attr: {
        'v-if': '',
      },
    };
  }
  

  public renderFragment () {
    let LogicBox = `
      <logic-box  
        :uuid="'${this.uuid}'" 
        ${this._attrStr}
      ></logic-box>
    `;

    this.$fragment = cheerio.load(LogicBox, {
      xmlMode: true,
      decodeEntities: false,
    });

  }

  public setConfig () {

  };

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
    this.renderFragment();
    this.renderBox(type);
    return this.$fragment;
  }

  public addComponent (data: any) {
    const { key, name, params } = data;
    const dynamicObj = require(`../../component/${key}`).default;
    const componentIndex = this.components.length;
    this.components.push(new dynamicObj({
      'v-model': name,
    }, componentIndex, params));
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
        this.$fragment('logic-box').append(component.getFragment(type).html());
      }
    });
  }

  public getConfig() {
    return this.config
  }

}