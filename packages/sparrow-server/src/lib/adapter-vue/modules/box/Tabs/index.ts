const uuid = require('@lukeed/uuid');
import IBaseBox from '../IBaseBox';
import * as cheerio from 'cheerio';
import VueParse from '../../generator/VueParse';
import * as fsExtra from 'fs-extra';
import * as path from 'path';
import Config from '../../../config';
import Base from '../Base';
import Container from '../Container';
import * as _ from 'lodash';

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
      this.config = _.cloneDeep(require('./config').default);

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
      return new Function(`var data = ${config ? config : this.config.model.slot.data}; return data;`)();
    } catch (e) {
      return null;
    }
  }
  
  

  public setPreview () {
    this.resetComponents();
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
            :list="${this.config.model.slot.data}"
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

  private resetComponents () {
    const newData = this.getTabsData(this.config.model.slot.data);
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
}