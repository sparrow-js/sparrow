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
import TabPane from './TabPane';

export default class Tabs extends Base implements IBaseBox{
  public uuid = '';
  $fragment = null;
  public components = [];
  name: string = 'Tabs';
  type: string = 'inline';
  insertFileType: string = 'inline';
  config: any = {};
  vueParse: any;

  constructor (data: any, storage: any) {
    super(storage);
    this.uuid = uuid().split('-')[0];
    const { params, config } = data;
    if (config) {
      this.config = config;
    } else {
      this.config = _.cloneDeep(require('./config').default);
      this.initComponent();
    }

    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'component/TabsBox', 'comp.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr); 
  }

  initComponent () {
    for(let i = 0; i < 3; i++) {
      this.components.push(new TabPane({name: `tab${i + 1}`}, this.storage));
    }
  }
  

  public setPreview () {
    const type = this.storage.get('preview_view_status') || 0;

    let TabsBox = '';

    TabsBox = `
      <div style="margin-bottom: 20px;">
        <el-tabs v-model="activeName" ${this._attrStr} @tab-click="handleClick">
        </el-tabs>
      </div>
    `;

    this.$fragment = cheerio.load(TabsBox, {
      xmlMode: true,
      decodeEntities: false,
    });

    this.$fragment('el-tabs').empty();
    this.components.forEach(item => {
      this.$fragment('el-tabs').append(item.getFragment(0).html())
    });
  
  }
}