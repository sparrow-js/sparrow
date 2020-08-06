const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';
import * as fsExtra from 'fs-extra';
import Config from '../../../config';
import * as path from 'path';
import Container from '../Container'
import Base from '../Base';


export default class ArrayList extends Base{
  $fragment = null;
  public components = [];
  name: string = 'ArrayList';
  insertComponents:string[] = [];
  config: any = {};
  _attrStr: string = '';
  constructor (data: any, storage: any) {
    super(storage)
    const { config } = data;
    if (config) {
      this.config = config
    } else {
      this.config = {
        _attr: {
          label: '卡片名称'
        },
        _custom: {
          hasHeader: true,
        },
      };

      this.insertComponents.push('ArrayList');
      const componentsDir = Config.componentsDir; 
      const compDir = path.join(componentsDir, 'ArrayList')
      fsExtra.copySync(path.join(Config.serverBusinessPath, 'ArrayList'), compDir)
      this.initComponent();
    }
  
  }

  initComponent () {
    const curBox = new Container({}, this.storage)
    this.components.push(curBox);
    return curBox;
  }
  

  public renderBox () {
    if (!this.components[0]) return;
    const {_attr} = this.config;
    let LogicBox = this.components[0].getFragment().html();


  let arrayListBox = `
    <array-list ${this._attrStr}>
      <template v-slot:item="{ item }">
        ${LogicBox}
      </template>
    </array-list>
  `;

    const type = this.storage.get('preview_view_status') || 0;
  

    this.$fragment = cheerio.load(arrayListBox, {
      xmlMode: true,
      decodeEntities: false,
    });

  }
  

  public setConfig (config: any) {
    this.config = config;
  };
  
  public getFragment () {
    this.renderBox();
    return this.$fragment;
  }


  public getConfig() {
    return this.config
  }

  public insertEditText (params) {
    this.config._attr.label = params.value;
  }

  setting (data: any) {
    const {config} = data;
    this.config = config;
  }

}