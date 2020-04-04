import * as fsExtra from 'fs-extra';
import VueParse from '../../../generator/VueParse';
import * as path from 'path';
import Base from '../Base';

export default class Edit extends Base{
  name: string;
  params: any;
  vueParse: any;
  uuid: string;
  type: string;
  constructor (type: string, params?: any) {
    super()
    this.type = type;
    this.params = params;
    this.init();
  }
  private init () {}

  public fragment () {
    let tag = '';
    if (this.type === 'tag') {
      return `
        <el-tag>
          ${this.params.value}
        </el-tag>
      `;
    } else if (this.type === 'link'){
      return `
        <el-link type="primary">
          ${this.params.value}
        </el-link>
      `;
    } else if (this.type === 'button') {
      return `
        <el-button type="primary" size="mini">
          ${this.params.value}
        </el-button>
      `;
    }

    return '';
  }
}