import Base from '../Base';

export default class Delete extends Base{
  name: string = 'See';
  params: any;
  vueParse: any;
  uuid: string;
  type: string;
  constructor (params: any = {}) {
    super()
    this.type = params.type;
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