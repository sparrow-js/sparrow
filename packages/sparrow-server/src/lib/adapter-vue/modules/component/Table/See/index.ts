import * as fsExtra from 'fs-extra';
import VueParse from '../../../generator/VueParse';
import * as path from 'path';
import Base from '../Base';

export default class Delete extends Base{
  name: string = 'See';
  params: any;
  vueParse: any;
  uuid: string;
  type: string;
  constructor (type: string) {
    super()
    this.type = type;
    this.init();
  }
  
  private init () {}

  public fragment () {
    if (this.type === 'button') {
      return `
        <router-link :to="'/example/edit'">
          <el-button type="primary" size="mini">
            查看
          </el-button>
        </router-link>
      `;
    } else if (this.type === 'link') {
      return `
        <router-link :to="'/example/edit'">
          <el-link type="primary" size="mini">
            查看
          </el-link>
        </router-link>
      `;

    }
    return '';
  }
}