import * as cheerio from 'cheerio';

export default class InputNumber {
  public type = 'form';
  public $fragment: any;

  constructor () {
    this.$fragment = cheerio.load(this.fragment(), {
      xmlMode: true
    });
  }

  public fragment () {
    return `
      <el-form-item label="即时配送">
        <el-switch></el-switch>
      </el-form-item>
    `;
  }

  public getFragment () {
    return this.$fragment;
  }
}