
import * as cheerio from 'cheerio';
import Common from '../Common';
import * as _ from 'lodash';

const uuid = require('@lukeed/uuid');

export default class EditText extends Common{
  name: string = 'EditText';
  config: any = {};
  $fragment: any;

  constructor (params: any) {
    super();
    const {initType} = params;
    if (initType === 'auto' ) {
      this.config = params;
    } else {
      this.config = _.cloneDeep(require('./config').default);
    }
    this.setAttrsToStr();
  }

  public insertEditText (params) {
    this.config.model.custom.label = params.value;
  }


  public fragment () {

    const type = this.storage.get('preview_view_status') || 0;
    let typography = '';
    if (type === 0) {
      typography = `
        <edit-text-box :clearClass="true" uuid="${this.uuid}" ${this._attrStr}>
          ${this.config.model.custom.label}
        </edit-text-box>
      `
    } else {
      typography = `
        <div ${this._attrStr}>${this.config.model.custom.label}</div>
      `;
    }
    return typography;
  }
}