
import * as cheerio from 'cheerio';
import Base from '../Base';
import * as _ from 'lodash';

const uuid = require('@lukeed/uuid');

export default class Icon extends Base{
  name: string = 'Icon';
  config: any = {};
  $fragment: any;
  styleStr: string = '';

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
      <span>
        <i ${this._attrStr} ${this.styleStr}></i>
      </span>
    `;
  }

  public customAttrHandler () {
    const custom = _.get(this.config, 'model.custom');
    const styleKeys = [
      'color',
      'font-size',
      'style',
    ];

    const styleArr = [];
    
    styleKeys.forEach(key => {
      if (key === 'style') {
        styleArr.push(custom[key]);
        return;
      }
      if (custom[key]) {
        styleArr.push(`${key}: ${custom[key]}`);
      }
    });
    if (styleArr.length > 0) {
      this.styleStr = `style="${styleArr.join(';')}"`
    }    
  }
}