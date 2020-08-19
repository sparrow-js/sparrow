
import * as cheerio from 'cheerio';
import Common from '../Common';
const uuid = require('@lukeed/uuid');

export default class Typography extends Common{
  name: string = 'Typography';
  config: any = {};
  $fragment: any;

  constructor (params: any) {
    super();
    this.config = {
      // 组件自定义配置
      custom: {
        label: 'Hello',
        type: params.type
      },
    };
    this.renderTemplate();
  }

  private wrapEditText (content) {
    const type = this.storage.get('preview_view_status') || 0;
    if (type === 0) {
      return `
        <edit-text-box :clearClass="true" uuid="${this.uuid}">
          ${content}
        </edit-text-box>
      `
    } else {
      return content;
    }

  }

  renderTemplate () {
    let typography = '';
    switch (this.config.custom.type) {
      case 'H1':
        typography = `
        <h1 class="s-typography">
          ${this.wrapEditText(this.config.custom.label)}
        </h1>`;
        break;
      case 'H2':
        typography = `
        <h2 class="s-typography">
          ${this.wrapEditText(this.config.custom.label)}
        </h2>`;
        break;
      case 'H3':
        typography = `
        <h3 class="s-typography">
          ${this.wrapEditText(this.config.custom.label)}
        </h3>`;
        break;
      case 'H4':
        typography = `
        <h4 class="s-typography">
          ${this.wrapEditText(this.config.custom.label)}
        </h4>`;
        break;
      case 'Text':
        typography = `
        <p class="s-typography">
          ${this.wrapEditText(this.config.custom.label)}
        </p>`;
        break;
      case 'AText':
        typography = `
        <p class="s-typography minor-typography">
          ${this.wrapEditText(this.config.custom.labe)}
        </p>`;
        break;    
      default:
        break;  
    }
    this.$fragment = cheerio.load(typography, {
      xmlMode: true,
      decodeEntities: false,
    });

  }

  public insertEditText (params) {
    this.config.custom.label = params.value;
  }


  public getFragment () {
    this.renderTemplate();
    return this.$fragment;
  }
}