import * as fsExtra from 'fs-extra';
import * as path from 'path';

export default class ResetButton {
  name: string = 'ResetButton';
  params: any;
  vueParse: any;
  uuid: string;
  type: string;
  constructor (type: string) {
    this.type = type;
    this.init();
  }
  
  private init () {}

  public fragment () {    
    return `
      <el-button type="default" style="margin-right: 10px;">
        重置
      </el-button>
    `;
  }
}