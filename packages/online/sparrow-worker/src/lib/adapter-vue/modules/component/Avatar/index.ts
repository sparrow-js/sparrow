
import Common from '../Common';
import * as _ from 'lodash';

export default class Avatar extends Common{
  name: string = 'Avatar';
  config: any = {};
  $fragment: any;

  constructor (params: any) {
    super();
    const {initType} = params;
    if (initType === 'auto' ) {
      this.config = params;
    } else {
      this.config = _.cloneDeep(require('./config'));
    }
    this.setAttrsToStr();
  }

  public insertEditText (params) {
    this.config.model.custom.label = params.value;
  }
  
  public fragment () {

    const type = this.storage.get('preview_view_status') || 0;
    let divider = '';
    if (type === 0) {
      divider = `<el-avatar data-design-mode="design-border" data-instance-name="${this.name}" ${this._attrStr} data-id="${this.uuid}"></el-avatar>`
    } else {
      divider = `
        <el-avatar ${this._attrStr}></el-avatar>
      `;
    }
    return divider;
  }

  public wrapComponentBox (content) {
    return content;
  }
}