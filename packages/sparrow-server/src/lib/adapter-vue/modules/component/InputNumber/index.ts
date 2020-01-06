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
      <el-form-item label="基础数字框" prop="name">
        <el-input-number :min="1" :max="10"></el-input-number>
      </el-form-item>
    `;
  }

  public getFragment () {
    return this.$fragment;
  }
}