const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';
import VueParse from '../../generator/VueParse';
import * as fsExtra from 'fs-extra';
import * as path from 'path';
import Config from '../../../config';
import Container from '../Container'

export default class Dialog{
  public uuid = '';
  $fragment = null;
  public components = [];
  name: string = 'Dialog';
  type: string = 'inline';
  insertFileType: string = 'inline';
  vueParse: any;
  displayMode: string;
  storage: any = null;


  constructor (data: any, storage: any) {
    this.storage = storage;
    this.displayMode = data.displayMode || 'btn';
    this.uuid = uuid().split('-')[0];
    this.renderFragment(0);
    this.addBox();
    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'box/dialog', 'comp.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr); 
  }

  public renderFragment (type: number) {
    let btn = '';
    if (this.displayMode === 'btn') {
      btn = `<el-button type="primary" size="mini" @click="dialogVisibleHandler${this.uuid}">弹窗</el-button>`
    }
    
    const DialogBox = `
      <div>
        ${btn}
        <div class="comp-box">
          <el-dialog width="70%" title="收货地址" :visible.sync="dialogVisible">
            <div class="dialog-home"></div>
          </el-dialog>
        </div>
      </div>
    `;

    this.$fragment = cheerio.load(DialogBox, {
      xmlMode: true,
      decodeEntities: false,
    });
  }

  addBox () {
    this.components.push(new Container({}, this.storage));
  }
  
  renderTemplate () {
    this.$fragment('.dialog-home').empty();
    this.components.forEach(item => {
      this.$fragment('.dialog-home').append(item.getFragment().html())
    });
  }

  public setConfig (config: any) {};

  public getFragment () {
    this.renderTemplate();
    return this.$fragment;
  }

  public getFragmentOther () {
    return cheerio.load(
      `<el-button type="primary" size="small" @click="dialogVisibleHandler${this.uuid}">弹窗</el-button>`, {
      xmlMode: true,
      decodeEntities: false,
    });
  }

  getSetting () {
    return {};
  }

  public  (type: number) {
    return this.$fragment;
  }


  addComponent () {
    
  }

  private renderBox (type) {
    
  }

  public getConfig() {
    return null
  }

} 