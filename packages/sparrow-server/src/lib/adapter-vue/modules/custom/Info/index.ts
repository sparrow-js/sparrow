import * as cheerio from 'cheerio';
import Base from '../../box/Base';
import * as _ from 'lodash';
import Config from '../../../config';
import * as path from 'path';
import * as fsExtra from 'fs-extra';

export default class info extends Base  {
  public components:any = [];
  public $fragment: any;
  name: string = 'info';
  label: string = '';
  previewType: number = 0;
  type:string = 'inline';
  unique: string | number;
  toggle: boolean = false;
  config: any = {};
  params: any = {};
  insertComponents:string[] = [];

  constructor (data: any, storage: any) {
    super(storage);
    const { params, config } = data;
    this.params = params;
    if (config) {
      this.config = config;
    } else {
      this.insertComponents.push('Info');
      const componentsDir = Config.componentsDir; 
      const compDir = path.join(componentsDir, 'Info')
      fsExtra.copySync(path.join(Config.serverBusinessPath, 'Info'), compDir)
      this.config = _.cloneDeep(require('./config').default);
    }

    this.setAttrsToStr();
    this.setPreview();
  }


  public setPreview () {
    const type = this.storage.get('preview_view_status') || 0;
    this.previewType = type;
    if (type === 0) {
      this.$fragment = cheerio.load(` 
        <info ${this._attrStr}>
          <div class="drag-box" data-id="${this.uuid}"></div>
        </info>
      `, {
        xmlMode: true,
        decodeEntities: false
      });
    } else {
      this.$fragment = cheerio.load(`
        <info class="drag-box" ${this._attrStr}></info>
      `, {
        xmlMode: true,
        decodeEntities: false
      });
    }
    this.renderBox()
  }


  public renderBox () {
    this.$fragment('.drag-box').first().empty();
    this.components.forEach(component => {
      this.$fragment('.drag-box').first().append(component.getFragment(this.previewType).html());
    });

    if (this.components.length  === 0 && this.previewType === 0) {
      this.$fragment('.drag-box').attr('data-empty', true);
    }
  }
}