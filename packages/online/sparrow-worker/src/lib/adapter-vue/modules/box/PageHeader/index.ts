import IBaseBox from '../IBaseBox';
import * as cheerio from 'cheerio';
import Base from '../Base';

export default class PageHeader extends Base{
  name: string = 'PageHeader';
  $fragment: any;
  components: any = [];
  type: string = 'inline';
  previewType: number = 0;
  labelValue: string = '详情页面';
  config: any = {};

  constructor (data: any, storage: any) {
    super(storage)
    const { params } = data;
    this.config = {
      label: '详情页面'
    };
    this.$fragment = cheerio.load(
      `
        <el-page-header content="">
          <edit-text-box
            slot="content"
            :clearClass="true" 
            uuid="${this.uuid}">
            ${this.config.label}
          </edit-text-box>
        </el-page-header>
      `, {
        xmlMode: true,
        decodeEntities: false
      });
  }

  public setLabel(labelValue: string) {
    this.labelValue = labelValue;
  }

  public insertEditText (params) {
    this.config.label = params.value;
  }

  public setPreview () {
    const type = this.storage.get('preview_view_status') || 0;

    if (type === 0) {
      this.$fragment = cheerio.load(
        `
        <el-page-header content="">
          <edit-text-box 
            slot="content"
            :clearClass="true" 
            uuid="${this.uuid}">
            ${this.config.label}
          </edit-text-box>
        </el-page-header>
        `, {
        xmlMode: true,
        decodeEntities: false
      });
    } else {
      this.$fragment = cheerio.load(
        ` <el-page-header content="${this.labelValue}">
          </el-page-header>
        `, {
          xmlMode: true,
          decodeEntities: false
        });
    }
  }

}