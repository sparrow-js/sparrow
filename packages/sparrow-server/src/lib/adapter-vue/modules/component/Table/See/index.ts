import Base from '../Base';

export default class Delete extends Base{
  name: string = 'See';
  params: any;
  vueParse: any;
  uuid: string;
  type: string;
  config: any;
  constructor (params: any = {}) {
    super();

    if (params.config) {
      this.config = params.config;
    } else {
      this.config = {
        type: params.params.type
      }
    }

    this.init();
  }
  
  private init () {}

  public fragment () {
    if (this.config.type === 'button') {
      return `
        <router-link :to="'/example/edit'">
          <el-button type="primary" size="mini">
            查看
          </el-button>
        </router-link>
      `;
    } else if (this.config.type === 'link') {
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