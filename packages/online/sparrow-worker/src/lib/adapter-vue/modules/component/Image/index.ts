import Base from '../Base';
import * as _ from 'lodash';

export default class Image extends Base{
  name: string = 'Image';

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
      <el-image ${this._attrStr}>
    `;
  }
}