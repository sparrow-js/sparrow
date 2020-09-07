import * as cheerio from 'cheerio';
import * as _ from 'lodash';
import Base from '../Base';


export default class RouterLink  extends Base {
  $fragment = null;
  public components = [];
  name: string = 'RouterLink';
  vueParse: any;
  storage: any = null;
  config: any = {};

  constructor (data: any, storage: any) {
    super(storage);
    const { config } = data;
    if (config) {
      this.config = config
    } else {
      this.config = _.cloneDeep(require('./config').default);
    }
    this.storage = storage;
    this.setAttrsToStr();
  }

  public setPreview () {   
    const type = this.storage.get('preview_view_status') || 0;
    let box = '';
    if (type === 0) {
      box = `
        <div>
          <div class="drag-box" data-id="${this.uuid}"></div>
        </div>
      `;
    } else {
      box = `
        <router-link ${this._attrStr} class="link-type">
          <span class="drag-box" data-id="${this.uuid}"></span>
        </router-link>
      `;
    }

    this.$fragment = cheerio.load(box, {
      xmlMode: true,
      decodeEntities: false,
    });
    this.renderComp();
  }

  public insertEditText (params) {
    this.config.model.custom.label = params.value;
  }

} 