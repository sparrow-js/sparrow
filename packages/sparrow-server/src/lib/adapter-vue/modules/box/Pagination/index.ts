import IBaseBox from '../IBaseBox';
import * as boxFragment from '../../fragment/box';
import * as cheerio from 'cheerio';
import Base from '../Base';

export default class Pagination extends Base implements IBaseBox{
  name: string = 'Pagination';
  $fragment: any;
  components: any = [];
  type: string = 'inline';
  previewType: number = 0;

  constructor (data: any, storage: any) {
    super(storage)
    const { params } = data;
    this.$fragment = cheerio.load(
      `
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      `, {
        xmlMode: true,
        decodeEntities: false
      });
  }


  public getFragment(index: number): any {
    return this.$fragment;
  }

  public setPreview () {
    const type = this.storage.get('preview_view_status') || 0;
    if (this.previewType === type) {
      return;
    } else {
      this.previewType = type;
    }

    if (type === 0) {
      this.$fragment = cheerio.load(
        `
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        `, {
        xmlMode: true,
        decodeEntities: false
      });
    } else {
      this.$fragment = cheerio.load(
        `<div class="custom-inline">
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </div>`, {
          xmlMode: true,
          decodeEntities: false
        });
    }
  }
  public getSetting () {
    return {};
  }

}