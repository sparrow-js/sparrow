import * as cheerio from 'cheerio';
import * as _ from 'lodash';
import Base from '../Base';


export default class Card extends Base{
  $fragment = null;
  public components = [];
  name: string = 'Card';
  type: string = 'inline';
  config: any = {};
  storage: any = null;
  constructor (data: any, storage: any) {
    super(storage);
    const { config } = data;
    this.storage = storage;
    if (config) {
      this.config = config
    } else {
      this.config = _.cloneDeep(require('./config'));
    }
    this.setAttrsToStr();
  }
  

  public setPreview () {
    const {model} = this.config;

    const type = this.storage.get('preview_view_status') || 0;
    let labelBox = `
      <edit-text-box :clearClass="true" uuid="${this.uuid}">
        ${model.custom['label']}
      </edit-text-box>
    `;

    if (type === 1) {
      labelBox = `
        <span>${model.custom['label']}</span>
      `;
    }

    let headerBox = '';

    if (this.config.model.custom.hasHeader === true) {
      headerBox = `
        <div slot="header" class="clearfix">
          ${labelBox}
        </div>
      `;
    }
    
    let CardBox = `
      <div style="margin-bottom: 20px;">
        <el-card class="box-card" ${this._attrStr}>
          ${headerBox}
          <div class="card-content drag-box" data-id="${this.uuid}"></div>
        </el-card>
      </div>
    `;

    if (type === 1) {
      CardBox = `
        <div style="margin-bottom: 20px;">
          <el-card class="box-card" ${this._attrStr}>
            ${headerBox}
            <div class="card-content drag-box"></div>
          </el-card>
        </div>
      `;
    }

    this.$fragment = cheerio.load(CardBox, {
      xmlMode: true,
      decodeEntities: false,
    });

    this.renderBox();
  }


  public insertEditText (params) {
    this.config.model.custom.label = params.value;
  }

  public renderBox () {
    this.$fragment('.drag-box').first().empty();
    this.components.forEach(component => {
      this.$fragment('.drag-box').first().append(component.getFragment(this.previewType).html());
    });

    if (this.components.length  === 0) {
      this.$fragment('.drag-box').attr('data-empty', true);
    }
  }

}