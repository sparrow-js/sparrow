import Common from '../../Common';

export default class Delete extends Common{
  name: string = 'See';
  params: any;
  vueParse: any;
  uuid: string;
  type: string;
  config: any;
  constructor (params: any = {}) {
    super();

    this.init();
  }
  
  private init () {}

  public fragment () {
    return `
      <router-link :to="'/example/edit'">
        <el-button type="primary" size="mini">
          查看
        </el-button>
      </router-link>
    `;
  }
}