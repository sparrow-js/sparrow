const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';
import BasicBox from '../BasicBox';
import VueParse from '../../generator/VueParse';
import * as fsExtra from 'fs-extra';
import * as path from 'path';
import Config from '../../../config';

export default class TabsBox{
  public uuid = '';
  $fragment = null;
  public components = [];
  name: string = 'TabsBox';
  type: string  = 'box';
  config: any = {};
  _attrStr: string = '';
  vueParse: any;

  constructor (params: any = {}) {
    this.uuid = uuid().split('-')[0];
    if (params.initType === 'auto') {
      this.config = params;
    } else {
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
    }
   

    const tabsData = this.getTabsData();

    if (tabsData && Array.isArray(tabsData)) {
      tabsData.forEach(tabItem => {
        const curBasicBox = new BasicBox('tab_item', tabItem.value);
        this.components.push(curBasicBox);
      });
    }

    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'component/TabsBox', 'comp.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr); 
  }

  public settingConfig (data: any) {
   
    const {handler, params} = data;
    try {
      if (handler === 'setActive') {
        this.config._attr[':active-name'] = params.activeName;
      }
    } catch (e) {}
   
  }



  private getTabsData (config: any = null) {
    try {
      return new Function(`var data = ${config ? config : this.config._slot.data}; return data;`)();
    } catch (e) {
      return null;
    }
  }
  

  public renderFragment (type: number) {
    let TabsBox = '';
    if (type === 0) {
      let tabsItemArr = [];
      if (this.components && Array.isArray(this.components)) {
        this.components.forEach(tabItem => {
          tabsItemArr.push(`
            <div slot="tab_${tabItem.unique}">
              ${tabItem.getFragment(type).html()}
            </div>
          `);
        });
      }
  
      TabsBox = `
        <div style="margin-bottom: 20px;">
          <tabs-box 
            :list="${this.config._slot.data}"
            :uuid="'${this.uuid}'"
            :active-name="'${this.config._attr[':active-name']}'"
          >
            ${tabsItemArr.join('')}
          </tabs-box>
        </div>
      `;
    } else {
      let tabsItemArr = [];
      if (this.components && Array.isArray(this.components)) {
       const tabsData = this.getTabsData();
        this.components.forEach(tabItem => {
          const current = tabsData.find(item => item.value === tabItem.unique);
          if (current) {
            tabsItemArr.push(`
            <el-tab-pane
              label="${current.label}" 
              name="${tabItem.unique}"
            >
              <div>
                ${tabItem.getFragment(type).html()}
              </div>
            </el-tab-pane>
  
            `);
          }
        });
      }

      TabsBox = `
        <div style="margin-bottom: 20px;">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            ${tabsItemArr.join('')}
          </el-tabs>
        </div>
      ` 
    }
    

    this.$fragment = cheerio.load(TabsBox, {
      xmlMode: true,
      decodeEntities: false,
    });
  }

  public setConfig (config: any) {
    const hasNewComp = this.resetComponents(config);
    if (hasNewComp === false) return;
    this.config = config;
    this.setAttrsToStr();
  };

  private resetComponents (config: any) {
    const newData = this.getTabsData(config._slot.data);
    const oldData = this.getTabsData();
    if (newData && Array.isArray(newData)) {
      oldData.forEach(item => {
        const index = newData.findIndex(cur => cur.value === item.value);
        if (index < 0) {
         const compIndex = this.components.findIndex(cur => cur.unique === item.value);
         this.components.splice(compIndex, 1);
        }
      });

      newData.forEach(item => {
        const index = oldData.findIndex(cur => cur.value === item.value);
        if (index < 0) {
          const curBasicBox = new BasicBox('tab_item', item.value);
          this.components.push(curBasicBox);
        }
      });
      return true;
    } else {
      return false;
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
    return this.$fragment;
  }

  public getConfig() {
    return this.config
  }

}