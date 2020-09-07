const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';
import VueParse from '../../generator/VueParse';
import * as fsExtra from 'fs-extra';
import * as path from 'path';
import Config from '../../../config';
import * as _ from 'lodash';
import Base from '../Base';


export default class Tooltip  extends Base {
  $fragment = null;
  public components = [];
  name: string = 'Tooltip';
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
  }

  public setPreview (type: number) {    
    const DialogBox = `
      <div>
        <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
          <el-button>上左</el-button>
        </el-tooltip>
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