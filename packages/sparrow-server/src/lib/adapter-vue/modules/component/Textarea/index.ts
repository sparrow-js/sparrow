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
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
    `;
  }

  public getFragment () {
    return this.$fragment;
  }
}