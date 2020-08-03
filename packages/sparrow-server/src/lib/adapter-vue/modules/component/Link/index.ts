
import * as cheerio from 'cheerio';
const uuid = require('@lukeed/uuid');

export default class Link{
  name: string = 'Link';
  config: any = {};
  uuid: string = '';
  $fragment: any;

  constructor (params: any) {
    this.uuid = uuid().split('-')[0];

    this.config = {
      // 组件自定义配置
      _custom: {
        label: '主要链接',
      },
    };

    this.renderTemplate();
  }

  renderTemplate () {
    this.$fragment = cheerio.load(`
      <el-link type="primary">
        <edit-text-box :clearClass="true" uuid="${this.uuid}">${this.config._custom.label}</edit-text-box>
      </el-link>
    `, {
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