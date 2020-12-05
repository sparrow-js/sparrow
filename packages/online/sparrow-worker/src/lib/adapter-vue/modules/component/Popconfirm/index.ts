import Base from '../Base';
import * as _ from 'lodash';

export default class Popconfirm extends Base{
  name: string = 'Popconfirm';

  constructor (params: any, boxPath: string) {
    super(boxPath);
    if (params.initType === 'auto') {
      this.config = params;
    } else {
      this.config = _.cloneDeep(require('./config'));
    }
    this.setAttrsToStr();
  }

  public fragment () {
    return `
      <el-popconfirm
        title="确定删除吗？"
      >
        <el-button slot="reference">删除</el-button>
      </el-popconfirm>
    `;
  }
}