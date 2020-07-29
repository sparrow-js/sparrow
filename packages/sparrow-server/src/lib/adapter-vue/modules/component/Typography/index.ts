
import * as cheerio from 'cheerio';
const uuid = require('@lukeed/uuid');

export default class Typography{
  name: string = 'Typography';
  config: any = {};
  uuid: string = '';
  $fragment: any;

  constructor (params: any) {
    this.uuid = uuid().split('-')[0];
    this.config = {
      // 组件自定义配置
      _custom: {
        label: 'Hello',
        type: params.type
      },
    };
    this.renderTemplate();
  }

  renderTemplate () {
    let typography = '';
    switch (this.config._custom.type) {
      case 'H1':
        typography = `
        <h1 class="s-typography">
          <edit-text-box :clearClass="true" uuid="${this.uuid}">${this.config._custom.label}</edit-text-box>
        </h1>`;
        break;
      case 'H2':
        typography = `
        <h2 class="s-typography">
          <edit-text-box :clearClass="true" uuid="${this.uuid}">${this.config._custom.label}</edit-text-box>
        </h2>`;
        break;
      case 'H3':
        typography = `
        <h3 class="s-typography">
          <edit-text-box :clearClass="true" uuid="${this.uuid}">${this.config._custom.label}</edit-text-box>
        </h3>`;
        break;
      case 'H4':
        typography = `
        <h4 class="s-typography">
          <edit-text-box :clearClass="true" uuid="'${this.uuid}'">${this.config._custom.label}</edit-text-box>
        </h4>`;
        break;
      case 'Text':
        typography = `<p class="s-typography">
          <edit-text-box :clearClass="true" uuid="${this.uuid}">${this.config._custom.label}</edit-text-box>
        </h4>`;
        break;
      case 'AText':
        typography = `<p class="s-typography minor-typography">
          <edit-text-box :clearClass="true" uuid="${this.uuid}">${this.config._custom.label}</edit-text-box>
        </h4>`;
        break;    
      default:
        break;  
    }
    this.$fragment = cheerio.load(typography, {
      xmlMode: true,
      decodeEntities: false,
    });

  }

  getConfig () {
    return {};
  }

  public insertEditText (params) {
    this.config._custom.label = params.value;
  }


  public getFragment () {
    this.renderTemplate();
    return this.$fragment;
  }
}