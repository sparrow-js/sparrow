const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';
import {initBlock, blockList, paragraph} from '../../fragment/scene';

export default class DialogBox{
  public uuid = '';
  $fragment = null;
  public components = [];
  name: string = 'DialogBox';
  type: string = 'inline';
  unique: string | number = '';
  constructor (name: string, unique: string | number) {
    this.name = name;
    this.unique = unique;
    this.uuid = uuid().split('-')[0];
  }

  public renderFragment (type: number) {
    
    const DialogBox = `
      <div>
        <el-button type="primary">主要按钮</el-button>
        <div class="comp-box">
          <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <div class="dialog-home">
            </div>
          </el-dialog>
        </div>
      </div>
    `;

    this.$fragment = cheerio.load(DialogBox, {
      xmlMode: true,
      decodeEntities: false,
    });

  }

  public setConfig (config: any) {};


  
  public getFragment (type: number) {
    this.renderFragment(type);
    this.renderBox(type);
    return this.$fragment;
  }

  private renderBox (type) {
    
  }

  public getConfig() {
    return null
  }

}