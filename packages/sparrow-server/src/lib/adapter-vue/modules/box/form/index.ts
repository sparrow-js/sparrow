import IBaseBox from '../IBaseBox';
import * as cheerio from 'cheerio';
import Base from '../Base';
import * as _ from 'lodash';
const templateStr =  `
  <div class="root" >
    <box-form></box-form>
  </div>
`;


export default class Form extends Base implements IBaseBox{
  template: string;
  name: string = 'Form';
  components: any = [];

  data: any = {};
  methods: any = {};
  previewType: number = 0; // 0: 编辑 1: 预览
  iFormAttrs: any = {};
  formatTemp: string = '';

  params: any = null;

  constructor (data: any, storage: any) {
    super(storage);
    const { params, config } = data;
    this.params = params;
    if (config) {
      this.config = config;
    } else {
      this.config = _.cloneDeep(require('./config').default);
    }
    
    this.setAttrsToStr();

    this.$fragment = cheerio.load(templateStr, {
        xmlMode: true,
        decodeEntities: false
      });

  }
  

  public setPreview () {
    const type = this.storage.get('preview_view_status') || 0;
    this.previewType = type;
    if (type === 0) {

      this.$fragment = cheerio.load(templateStr, {
        xmlMode: true,
        decodeEntities: false
      });
  
      this.$fragment('box-form').append(`
        <el-form ${this._attrStr}>
          <div class="drag-box" data-id=${this.uuid}></div>
        </el-form>
      `);
    } else {
      this.$fragment = cheerio.load(` 
        <div class="root">
        </div>
      `, {
        xmlMode: true,
        decodeEntities: false
      });
      this.$fragment('.root').append(`
        <el-form ${this._attrStr} class="drag-box">
        </el-form>
      `);
    }
    this.renderComp();
  }

}