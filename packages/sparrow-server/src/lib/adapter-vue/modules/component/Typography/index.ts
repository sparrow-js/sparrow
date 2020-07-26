
import * as cheerio from 'cheerio';
const uuid = require('@lukeed/uuid');

export default class Typography{
  name: string = 'Typography';
  config: any = {};
  uuid: string = '';
  $fragment: any;

  constructor (params: any) {
    this.uuid = uuid().split('-')[0];
    let typography = '';
    switch (params.type) {
      case 'H1':
        typography = `<h1 class="s-typography">Hello</h1>`;
        break;
      case 'H2':
        typography = `<h2 class="s-typography">hello</h2>`;
        break;
      case 'H3':
        typography = `<h3 class="s-typography">hello</h3>`;
        break;
      case 'H4':
        typography = `<h4 class="s-typography">hello</h4>`;
        break;
      case 'Text':
        typography = `<p class="s-typography">hello</h4>`;
        break;
      case 'AText':
        typography = `<p class="s-typography minor-typography">hello</h4>`;
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


  public getFragment () {
    return this.$fragment;
  }
}