import * as fsExtra from 'fs-extra';
import VueParse from '../../../generator/VueParse';
import * as path from 'path';
import Base from '../Base';

export default class TableCellText extends Base{
  name: string = 'TableCellText';
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
    const {tagType} = this.params;
    const type = tagType ? `:type="'${tagType}'"` : ''
    if (this.type === 'tag') {
      return `
        <el-tag
          ${type}
          size="small"
        >
          ${this.params.value}
        </el-tag>
      `;
    } else if (this.type === 'link'){
      return `
        <el-link
          ${type}
        >
          ${this.params.value}
        </el-link>
      `;
    } else if (this.type === 'button') {
      return `
        <el-button 
          ${type}
          size="mini"
        >
          ${this.params.value}
        </el-button>
      `;
    }

    return '';
  }
}