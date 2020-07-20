import IBaseBox from '../IBaseBox';
import * as boxFragment from '../../fragment/box';
import * as cheerio from 'cheerio';
import Base from '../Base';

export default class PageHeader extends Base implements IBaseBox{
  name: string = 'PageHeader';
  $fragment: any;
  components: any = [];
  type: string = 'inline';
  previewType: number = 0;
  labelValue: string = '详情页面';

  constructor (data: any, storage: any) {
    super(storage)
    const { params } = data;
    this.$fragment = cheerio.load(
      `
        <div class="box">
          <el-page-header content="">
            <label-box 
              slot="content"
              label="${this.labelValue}"
              :clear-class="true"
              uuid="${this.uuid}"
            ></label-box>
          </el-page-header>
        </div>
      `, {
        xmlMode: true,
        decodeEntities: false
      });
  }

  public setLabel(labelValue: string) {
    this.labelValue = labelValue;
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
          <div class="box">
            <el-page-header content="">
              <label-box 
                label="${this.labelValue}"
                :clear-class="true"
                uuid="${this.uuid}"
              ></label-box>
            </el-page-header>
          </div>
        `, {
        xmlMode: true,
        decodeEntities: false
      });
    } else {
      this.$fragment = cheerio.load(
        `<div class="custom-inline">
          <el-page-header content="${this.labelValue}">
          </el-page-header>
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