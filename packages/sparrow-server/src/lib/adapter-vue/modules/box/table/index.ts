import * as fsExtra from 'fs-extra';
import * as path from 'path';
import * as cheerio from 'cheerio';
import Config from '../../../config';
import VueParse from '../../generator/VueParse';
const uuid = require('@lukeed/uuid');
import * as _ from 'lodash';

import Base from '../Base';
import Column from './column';

export default class Table extends Base{
  $fragment: any;
  name: string = 'Table';
  VueGenerator: any;
  col: number = 2;

  data: any = {};
  methods: any = {};
  vueParse:any = {};
  previewType: number = 0;
  params: any = null;
  components: any = [];
  storage: any = {};
  vueParseArr: any = [];

  constructor (data: any, storage: any) {
    super(storage);
    this.storage = storage;
    const { params, config } = data;
    this.params = params;
    if (config) {
      this.config = config;
    } else {
      this.config = _.cloneDeep(require('./config').default);
      this.col = _.get(this.config, 'model.custom.col') || 8;
      if (!data.children) {
        for (let i = 0; i < this.col; i++) {
          const column = new Column({},this.storage)
          this.components.push(column);
        }
      }
    }

    this.setVueParse('Base');

   
    this.setAttrsToStr();
  }

  public setPreview () {
    const type = this.storage.get('preview_view_status') || 0;
    this.previewType = type;
    if (type === 0) {
      this.$fragment = cheerio.load(`
        <div class="box">
          <template>
            <div class="root">
              <table-box>
                <el-table
                  ${this._attrStr}
                  style="width: 100%"
                  :data="list">
                </el-table>
              </table-box>
            </div>
          </template>
        </div>`, {
        xmlMode: true,
        decodeEntities: false
      });
  
    } else {
      this.$fragment = cheerio.load(`
      <div class="root">
        <el-table
          ${this._attrStr}
          style="width: 100%"
          :data="list">
        </el-table>
      </div>
      `, {
        xmlMode: true,
        decodeEntities: false
      });
    }
    this.renderBox();
  }

  public initComponent (data?: any, insterType: string = 'manual') {
    const column = new Column({},this.storage)
    this.components.push(column);
  }

  public customAttrHandler () {
    const col = _.get(this.config, 'model.custom.col');
    const curCol = this.components.length;
    if (col > curCol) {
      for (let i = 0; i < col - curCol; i++) {
        this.initComponent();
      }
    }
  }

  public setVueParse (compName: string) {
    const uuidValue = uuid().split('-')[0]; 
    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'box/table',`${compName}.vue`), 'utf8');
    this.vueParse =  new VueParse(uuidValue, fileStr);
  }

  public renderBox () {
    this.$fragment('el-table').empty();
    this.$fragment('el-table').append(this.renderColumn());
  }

  public renderColumn () {
    let column = '';
    this.components.forEach(item => {
      column = column + item.getFragment().html();
    })
    return column;
  }
}