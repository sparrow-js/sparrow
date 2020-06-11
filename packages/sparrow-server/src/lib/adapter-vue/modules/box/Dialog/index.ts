const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';
import VueParse from '../../generator/VueParse';
import * as fsExtra from 'fs-extra';
import * as path from 'path';
import Config from '../../../config';
import Box from '../Box';

export default class DialogBox{
  public uuid = '';
  $fragment = null;
  public components = [];
  name: string = 'DialogBox';
  type: string = 'inline';
  unique: string | number = '';
  vueParse: any;

  constructor (name: string, unique: string | number) {
    this.unique = unique;
    this.uuid = uuid().split('-')[0];
    this.renderFragment(0);
    this.addBox();
    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'box/dialog', 'comp.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr); 
  }

  public renderFragment (type: number) {
    
    const DialogBox = `
      <div>
        <el-button type="primary" size="small" @click="dialogVisibleHandler${this.uuid}">弹窗</el-button>
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
    this.components.push(new Box());
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