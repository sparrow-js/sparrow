import * as cheerio from 'cheerio';
import Base from '../Base';


export default class Placeholder extends Base {
  public type = 'form';

  constructor (params: any) {
    super()
  }

  public fragment () {
    return `
      <div style="width: 100%;height: 48px;background: #EEE;text-align: center;line-height: 48px;">
      <label-box label="站位"></label-box>
      </div>
    `;
  }
}