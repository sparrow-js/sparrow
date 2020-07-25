const uuid = require('@lukeed/uuid');
import IBaseBox from '../IBaseBox';
import * as cheerio from 'cheerio';
import VueParse from '../../generator/VueParse';
import * as fsExtra from 'fs-extra';
import * as path from 'path';
import Config from '../../../config';
import Base from '../Base';
import Box from '../Box';
import Container from '../Container';

export default class Tabs extends Base implements IBaseBox{
  public uuid = '';
  $fragment = null;
  public components = [];
  name: string = 'Tabs';
  type: string = 'inline';
  insertFileType: string = 'inline';
  config: any = {};
  _attrStr: string = '';
  vueParse: any;

  constructor (data: any, storage: any) {
    super(storage);
    this.uuid = uuid().split('-')[0];
    const { params, config } = data;
    if (config) {
      this.config = config;
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
      
      const tabsData = this.getTabsData();

      if (tabsData && Array.isArray(tabsData)) {
        tabsData.forEach(tabItem => {
          const curBasicBox = new Container({}, this.storage)
          curBasicBox.config.unique = tabItem.value;
          this.components.push(curBasicBox);
        });
      }
    }
  



    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'component/TabsBox', 'comp.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr); 
  }

  
  addCustomComp (data: any) {
    const curBox = new Container({}, this.storage);
    this.components.push(curBox);
    return curBox;
  }

  private getTabsData (config: any = null) {
    try {
      return new Function(`var data = ${config ? config : this.config._slot.data}; return data;`)();
    } catch (e) {
      return null;
    }
  }
  
  

  public renderFragment () {
    let TabsBox = '';
    const type = this.storage.get('preview_view_status') || 0;
    if (type === 0) {
      let tabsItemArr = [];
      if (this.components && Array.isArray(this.components)) {
        this.components.forEach(tabItem => {
          tabsItemArr.push(`
            <div slot="tab_${tabItem.config.unique}">
              ${tabItem.getFragment(type).html()}
            </div>
          `);
        });
      }
  
      TabsBox = `
        <div style="margin-bottom: 20px;">
          <tabs-box
            :status="'box'"
            :list="${this.config._slot.data}"
            :uuid="'${this.uuid}'"
            :active-name="'first'"
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
          const current = tabsData.find(item => item.value === tabItem.config.unique);
          if (current) {
            tabsItemArr.push(`
            <el-tab-pane
              label="${current.label}" 
              name="${tabItem.config.unique}"
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

  public setting (data: any) {
    const {config} = data;
    const hasNewComp = this.resetComponents(config);
    if (hasNewComp === false) return;
    this.config = config;
    this.setAttrsToStr();
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
         const compIndex = this.components.findIndex(cur => cur.config.unique  === item.value);
         this.components.splice(compIndex, 1);
        }
      });

      newData.forEach(item => {
        const index = oldData.findIndex(cur => cur.value === item.value);
        if (index < 0) {
          const curBasicBox = new Container({}, this.storage);
          curBasicBox.config.unique = item.value;
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
  
  public getFragment () {
    this.renderFragment();
    return this.$fragment;
  }

  public getConfig() {
    return this.config
  }

  getSetting () {
    return this.config;
  }
}