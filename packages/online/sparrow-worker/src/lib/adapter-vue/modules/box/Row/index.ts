import IBaseBox from '../IBaseBox';
import * as cheerio from 'cheerio';
import Base from '../Base';
import Column from './Column';
import * as _ from 'lodash';

export default class Row extends Base implements IBaseBox{
  $fragment: any;
  components: any = [];
  template: string;
  params: any;
  name: string = 'Row';

  constructor (data: any, storage: any) {
    super(storage);
    const { params = {}, config} = data;
    this.params = params;
    if (config) {
      this.config = config;
    } else {
      this.config = _.cloneDeep(require('./rowConfig'));
      if (params.columns) {
        this.initComponent(params.columns);
      }
    }
    this.setAttrsToStr();

    this.$fragment = cheerio.load(`
      <div class="box">
        <el-row ${this._attrStr}></el-row>
      </div>
    `, {
      xmlMode: true,
      decodeEntities: false
    });

    this.renderBox();
  }

  initComponent (columns: number) {
    const arr = new Array(columns);
    arr.fill(1, 0);
    console.log(arr);
    arr.forEach(item => {
      this.components.push(new Column({span: 24 / arr.length}, this.storage));
    })
  }

  public setPreview () {
    this.$fragment = cheerio.load(`
      <div class="box">
        <el-row ${this._attrStr}></el-row>
      </div>
    `, {
      xmlMode: true,
      decodeEntities: false
    });

    this.renderBox();
  }


  renderBox () {
    this.$fragment('el-row').first().empty();
    this.components.forEach(item => {
      this.$fragment('el-row').first().append(item.getFragment(0).html())
    });
  }
}