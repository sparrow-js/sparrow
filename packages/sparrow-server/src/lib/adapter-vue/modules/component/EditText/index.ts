
import * as cheerio from 'cheerio';
import Common from '../Common';
const uuid = require('@lukeed/uuid');

export default class EditText extends Common{
  name: string = 'EditText';
  config: any = {};
  uuid: string = '';
  $fragment: any;

  constructor (params: any) {
    super();
    this.config = {
      // 组件自定义配置
      _custom: {
        label: 'Hello',
      },
    };
  }

  public insertEditText (params) {
    this.config._custom.label = params.value;
  }


  public fragment () {

    const type = this.storage.get('preview_view_status') || 0;
    let typography = '';
    if (type === 0) {
      typography = `
        <edit-text-box :clearClass="true" uuid="${this.uuid}">
          ${this.config._custom.label}
        </edit-text-box>
      `
    } else {
      typography = `
        <div>${this.config._custom.label}</div>
      `;
    }
    return typography;
  }
}