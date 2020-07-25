import IBaseBox from '../IBaseBox';
import * as cheerio from 'cheerio';
import * as boxFragment from '../../fragment/box';
import Base from '../Base';
import Column from './Column';

export default class Layout extends Base implements IBaseBox{
  $fragment: any;
  components: any = [];
  template: string;
  params: any;
  name: string = 'Layout';

  constructor (data: any, storage: any) {
    super(storage);
    const { boxIndex, params } = data;
    this.params = params;

    this.$fragment = cheerio.load(`
      <div class="box">
        <el-row></el-row>
      </div>
    `, {
      xmlMode: true,
      decodeEntities: false
    });
    this.initComponent();
    this.renderBox();
  }

  initComponent () {
    [0, 1].forEach(item => {
      this.components.push(new Column({}, this.storage));
    })
  }

  public getFragment(): any {
    this.renderBox();
    return this.$fragment;
  }

  renderBox () {
    this.$fragment('el-row').empty();
    this.components.forEach(item => {
      this.$fragment('el-row').append(item.getFragment(0).html())
    });
  }

  render () {}
  public getSetting () {}
}