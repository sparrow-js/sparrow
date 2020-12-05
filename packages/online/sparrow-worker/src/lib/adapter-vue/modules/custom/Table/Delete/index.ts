import VueParse from '../../../generator/VueParse';
import Common from '../../Common';
import Template from './template';

export default class Delete extends Common{
  name: string = 'Delete';
  params: any;
  vueParse: any;
  uuid: string;
  config: any;
  constructor (params: any = {}) {
    super();
    this.init();
  }
  
  private init () {
    // const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'component/Table/Delete', 'comp.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, Template.code);
  }

  public fragment () {
      return `
      <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
        删除
      </el-button>
    `;
  }
}