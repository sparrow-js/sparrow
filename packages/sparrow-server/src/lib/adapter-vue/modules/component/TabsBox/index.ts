const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';
import BasicBox from '../BasicBox';

export default class TabsBox{
  public uuid = '';
  $fragment = null;
  public components = [];
  name: string = 'TabsBox';
  type: string  = 'box';
  config: any = {};
  _attrStr: string = '';

  constructor () {
    this.uuid = uuid().split('-')[0];
    this.config = {
      _attr: {
        ':active-name': 'first'
      },
      _slot: {
        data: `
        [
          {
            label: '用户管理',
            value: 'first'
          },
          {
            label: '配置管理',
            value: 'second'
          },
          {
            label: '角色管理',
            value: 'third'
          },
          {
            label: '定时任务补偿',
            value: 'fourth'
          },
        ]
        `
      } 
    };

    const tabsData = this.getTabsData();

    if (tabsData && Array.isArray(tabsData)) {
      tabsData.forEach(tabItem => {
        const curBasicBox = new BasicBox('TabsItem', tabItem.value);
        this.components.push(curBasicBox);
      });
    }
  }

  public settingConfig (data: any) {
   
    const {handler, params} = data;
    try {
      if (handler === 'setActive') {
        this.config._attr[':active-name'] = params.activeName;
      }
    } catch (e) {}
   
  }



  private getTabsData () {
    try {
      return new Function(`var data = ${this.config._slot.data}; return data;`)();
    } catch (e) {
      return null;
    }
  }
  

  public renderFragment (type: number) {
    let tabsItemArr = [];
    if (this.components && Array.isArray(this.components)) {
      this.components.forEach(tabItem => {
        tabsItemArr.push(`
          <div slot="tab_${tabItem.unique}">
            ${tabItem.getFragment().html()}
          </div>
        `);
      });
    }

    let LogicBox = `
      <logic-box  
        :uuid="'${this.uuid}'"
      ></logic-box>
    `;

    let TabsBox = `
      <div style="margin-top: 20px;">
        <tabs-box 
          :list="${this.config._slot.data}"
          :uuid="'${this.uuid}'"
          :active-name="'${this.config._attr[':active-name']}'"
        >
          ${tabsItemArr.join('')}
        </tabs-box>
        
      </div>
    `;

    this.$fragment = cheerio.load(TabsBox, {
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
        formField.push(`${key}="${config._attr[key]}"`);
      });
      this._attrStr = formField.join(' ');
    }
  }
  
  public getFragment (type: number) {
    this.renderFragment(type);
    // this.renderBox(type);
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