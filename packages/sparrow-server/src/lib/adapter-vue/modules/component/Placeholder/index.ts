import * as cheerio from 'cheerio';

export default class Placeholder {
  public type = 'form';
  public $fragment: any;

  constructor () {
    this.$fragment = cheerio.load(this.fragment(), {
      xmlMode: true
    });
  }

  public fragment () {
    return `
      <div style="width: 100%;height: 48px;background: #EEE;text-align: center;line-height: 48px;">站位</div>
    `;
  }

  public getFragment () {
    return this.$fragment;
  }
}