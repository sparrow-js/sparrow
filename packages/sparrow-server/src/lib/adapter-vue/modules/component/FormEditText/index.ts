
import Base from '../Base';
import * as _ from 'lodash';

export default class FormEditText extends Base{
  name: string = 'FormEditText';
  config: any = {};
  $fragment: any;

  constructor (params: any, boxPath: string) {
    super(boxPath);
    const {initType} = params;
    if (initType === 'auto' ) {
      this.config = params;
    } else {
      this.config = _.cloneDeep(require('./config').default);
    }
    this.setAttrsToStr();
  }

  public insertEditText (params) {
    if (params.key === 'des') {
      this.config.model.custom.des = params.value;
    } else {
      this.config.model.custom.label = params.value;
    }
  }


  public fragment () {

    const type = this.storage.get('preview_view_status') || 0;
    let typography = '';
    if (type === 0) {
      typography = `
        <edit-text-box :custom-key="'des'" :clearClass="true" uuid="${this.uuid}" ${this._attrStr}>
          ${this.config.model.custom.des}
        </edit-text-box>
      `
    } else {
      typography = `
        <div ${this._attrStr}>${this.config.model.custom.des}</div>
      `;
    }
    return typography;
  }
}