import IBaseBox from '../IBaseBox';
import * as boxFragment from '../../fragment/box';
import * as cheerio from 'cheerio';
import Base from '../Base';

export default class CustomInline extends Base implements IBaseBox{
  name: string = 'CustomInline';
  $fragment: any;
  components: any = [];
  type: string = 'inline';
  previewType: number = 0;
  params: any = {};

  constructor (data: any, storage: any) {
    super(storage);
    const {params } = data;
    this.params = params;
    this.$fragment = cheerio.load(
      `<div class="box">
        <custom-inline :comp-box="'${this.params.compBox}'"></custom-inline>
      </div>`, {
      xmlMode: true,
      decodeEntities: false
    });

    this.observeComp();
  }

  public addComponent (data) {
    console.log(data);
    const { id, type } = data;
    const dynamicObj = require(`../../component/${this.params.compBox}/${id}`).default;
    this.components.push(new dynamicObj(type));
  }

  public resetRender () {
    this.renderTemplate();
  }

  public renderTemplate () {
    this.$fragment('custom-inline').empty();
    this.components.forEach(item => {
      if (this.previewType === 0) {
        this.$fragment('custom-inline').append(item.fragment())
      } else {
        this.$fragment('.custom-inline').append(item.fragment())
      }
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
      this.$fragment = cheerio.load( `
      <div class="box">
        <custom-inline :comp-box="'${this.params.compBox}'"></custom-inline>
      </div>`, {
        xmlMode: true,
        decodeEntities: false
      });
      this.renderTemplate();
    } else {
      this.$fragment = cheerio.load(`<div class="custom-inline"></div>`, {
        xmlMode: true,
        decodeEntities: false
      });
      this.renderTemplate();
    }

  }
  public getSetting () {
    return {};
  }

}