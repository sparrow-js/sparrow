const uuid = require('@lukeed/uuid');
import * as _ from 'lodash';
import * as cheerio from 'cheerio';

export default class Base {
  public uuid = '';
  components: any = [];
  storage: any = {};
  $fragment: any = null;
  name: string = 'api';
  alias: string = '';
  widgetType: string = 'api';
  treePath:string = ''; // 标记容器树路径
  previewType: number = 0;
  config: any = {};

  constructor (storage) {
    this.storage = storage;
    this.uuid = uuid().split('-')[0]; 
  }

  public settingConfig (config: any) {
    this.config = config;
    this.customAttrHandler();
  }
  

  public getFragment(index: number): any {
    return cheerio.load(`
        <div data-design-mode="design-border-api" data-instance-name="api" data-id="${this.uuid}" data-type="api"></div>
      `, {
        xmlMode: true,
        decodeEntities: false
      });
    ;
  }

  public customAttrHandler () {}

  public renderComp () {}

  getConfig() {
    return this.config;
  }
}