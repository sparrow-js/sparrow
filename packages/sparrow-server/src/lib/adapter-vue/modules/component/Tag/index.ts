
import * as cheerio from 'cheerio';
const uuid = require('@lukeed/uuid');

export default class Tag{
  name: string = 'Tag';
  config: any = {};
  uuid: string = '';
  $fragment: any;

  constructor (params: any) {
    this.uuid = uuid().split('-')[0];
    this.config = {
      // 组件自定义配置
      _custom: {
        label: '主要按钮',
        type: '',
        size: '',
        effect: '',
      },
    };
    this.renderTemplate();
  }



  getConfig () {
    return this.config;
  }


  renderTemplate () {
    this.$fragment = cheerio.load(`
      <el-tag>
        <edit-text-box :clearClass="true" uuid="${this.uuid}">${this.config._custom.label}</edit-text-box>
      </el-tag>
    `, {
      xmlMode: true,
      decodeEntities: false,
    });
  }

  public insertEditText (params) {
    this.config._custom.label = params.value;
  }

  public getFragment () {
    this.renderTemplate();
    return this.$fragment;
  }
}