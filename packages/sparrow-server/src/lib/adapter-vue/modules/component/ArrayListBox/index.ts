const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';

export default class ArrayListBox{
  public uuid = '';
  $fragment = null;
  public components = [];
  name: string = 'ArrayListBox';
  type: string  = 'box';
  config: any = {};
  _attrStr: string = '';
  constructor (attrs: any) {
    console.log('********123123******');

    this.uuid = uuid().split('-')[0];
    this.config = {
      _attr: {
        ':list': attrs['v-model'],
        ':default': 'var data = {}'
      },
    };
  }
  

  public renderFragment () {
    let LogicBox = `
      <logic-box  
        :uuid="'${this.uuid}'" 
      ></logic-box>
    `;

    let CardBox = `
      <div style="margin-top: 20px;">
        <array-list-box ${this._attrStr}>
          <template v-slot:item="{ item }">
            ${LogicBox}
          </template>
          
        </array-list-box>
      </div>

    `;

    this.$fragment = cheerio.load(CardBox, {
      xmlMode: true,
      decodeEntities: false,
    });

  }

  public setConfig (config: any) {
    this.config = config;
    this.setAttrsToStr();
  };

  public setAttrsToStr () {
    const {config} = this;
    if (config._attr) {
      const formField = [];
      Object.keys(config._attr).forEach(key => {
        if (key === ':default') {
          const defaultValue = /\{[\s\S]*\}/g.exec(config._attr[key]);
          if (defaultValue) {
            formField.push(`${key}="${defaultValue}"`);
          }
        } else {
          formField.push(`${key}="${config._attr[key]}"`);
        }
        
      });
      this._attrStr = formField.join(' ');
    }
  }
  
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
    return this.config
  }

}