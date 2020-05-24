const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';

export default class BasicBox{
  public uuid = '';
  $fragment = null;
  public components = [];
  name: string = 'BasicBox';
  type: string  = 'box';
  _attrStr: string = '';
  unique: string | number = '';
  constructor (name: string, unique: string | number) {
    this.name = name;
    this.unique = unique;
    this.uuid = uuid().split('-')[0];
  }
  

  public renderFragment () {
    let LogicBox = `
      <div style="margin-top: 20px;">
        <logic-box  
          :uuid="'${this.uuid}'" 
        ></logic-box>
      </div>
    `;

    this.$fragment = cheerio.load(LogicBox, {
      xmlMode: true,
      decodeEntities: false,
    });

  }

  public setConfig (config: any) {};


  
  public getFragment (type: number) {
    this.renderFragment();
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
        this.$fragment('logic-box').append(component.getFragment(type).html());
      }
    });
  }

  public getConfig() {
    return null
  }

}