const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';

export default class LogicBox{
  public uuid = '';
  $fragment = null;
  public components = [];
  name: string = 'CustomBox';
  type: string  = 'box';
  config: any = {};
  constructor () {
    this.uuid = uuid().split('-')[0];
    this.config = {};
  }
  
  public renderFragment (type: number) {
    let LogicBox = `
      <div class="custom" style="margin-bottom: 20px;">
        <custom-inline :comp-box="'BaseForm'"></custom-inline>
      </div>
    `;

    if (type === 1) {
      LogicBox = `
        <div class="custom" style="margin-bottom: 20px;"></div>
      `
    }

    this.$fragment = cheerio.load(LogicBox, {
      xmlMode: true,
      decodeEntities: false,
    });

  }

  public setConfig (config: any) {
    this.config = config;
  };

  
  public getFragment (type: number) {
    this.renderFragment(type);
    this.renderBox(type);
    return this.$fragment;
  }

  private renderBox (type) {
    this.components.forEach((component, index) => {
      if (type === 0) {
        this.$fragment('.custom').append(
          `<component-box indexcomp="${index}" uuid="${component.uuid}">
            ${component.getFragment(type).html()}
          </component-box>`
        );
      } else {
        this.$fragment('.custom').append(component.getFragment(type).html());
      }
    });
  }

  public getConfig() {
    return this.config
  }

}