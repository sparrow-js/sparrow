const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';
import VueParse from '../../generator/VueParse';
import * as _ from 'lodash';
import Base from '../Base';
import Template from './template';



export default class Dialog  extends Base {
  $fragment = null;
  public components = [];
  name: string = 'Dialog';
  vueParse: any;
  storage: any = null;
  config: any = {};

  constructor (data: any, storage: any) {
    super(storage);
    const { config } = data;
    if (config) {
      this.config = config
    } else {
      this.config = _.cloneDeep(require('./config'));
      this.config.model.custom.showMethod = `dialogVisibleHandler${this.uuid}`
    }
    this.storage = storage;
    this.vueParse = new VueParse(this.uuid, Template.code);
  }

  public setPreview (type: number) {    
    const DialogBox = `
      <div>
        <el-dialog width="70%" :visible.sync="${_.get(this.config, 'model.custom.visible')}">
          <edit-text-box slot="title" :clearClass="true" uuid="${this.uuid}">
            ${this.config.model.custom.label}
          </edit-text-box>
          <div class="dialog-content drag-box" data-id="${this.uuid}"></div>
        </el-dialog>
      </div>
    `;

    this.$fragment = cheerio.load(DialogBox, {
      xmlMode: true,
      decodeEntities: false,
    });
    this.renderComp();
  }

  public insertEditText (params) {
    this.config.model.custom.label = params.value;
  }

} 