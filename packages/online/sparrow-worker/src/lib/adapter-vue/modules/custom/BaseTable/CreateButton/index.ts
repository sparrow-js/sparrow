import VueParse from '../../../generator/VueParse';
import Config from '../../../../config';
import Common from '../../Common';

export default class CreateButton extends Common{
  name: string = 'CreateButton';
  params: any;
  vueParse: any;
  uuid: string;
  constructor () {
    super()
  }


  public fragment () {    
    return `
      <router-link :to="'/example/create'" style="margin-right: 10px;">
        <el-button type="primary">
          创建
        </el-button>
      </router-link>
    `;
  }
}