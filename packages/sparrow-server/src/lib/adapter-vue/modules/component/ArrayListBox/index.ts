const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';
import * as fsExtra from 'fs-extra';
import Config from '../../../config';
import * as path from 'path';


export default class ArrayListBox{
  public uuid = '';
  $fragment = null;
  public components = [];
  name: string = 'ArrayListBox';
  type: string  = 'box';
  config: any = {};
  _attrStr: string = '';
  insertComponents: any = ['ArrayList'];

  constructor (params: any) {

    this.uuid = uuid().split('-')[0];
    this.config = {
      _attr: {
        ':list': params['v-model'],
        ':default': 'var data = {}'
      },
    };
    const componentsDir = Config.componentsDir; 
    const compDir = path.join(componentsDir, 'ArrayList')
    fsExtra.copySync(path.join(Config.serverBusinessPath, 'ArrayList'), compDir)
  }
  

  public renderFragment (type: number) {
    let LogicBox = `
      <logic-box  
        :uuid="'${this.uuid}'" 
        :label="'array_list'"
      ></logic-box>
    `;

    if (type === 1) {
      LogicBox = '';
    }

    let arrayListBox = `
      <div style="margin-bottom: 20px;">
        <array-list ${this._attrStr}>
          <template v-slot:item="{ item }">
            ${LogicBox}
          </template>
        </array-list>
      </div>
    `;

    this.$fragment = cheerio.load(arrayListBox, {
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
        this.$fragment('template').append(component.getFragment(type).html());
      }
    });
  }

  public getConfig() {
    return this.config
  }

}