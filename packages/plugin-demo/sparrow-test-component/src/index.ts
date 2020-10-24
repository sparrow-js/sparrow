
import {Component, VueParse} from '@sparrow-vue/sparrow-utils';
import * as _ from 'lodash';
import * as fsExtra from 'fs-extra';
import * as path from 'path';
const cwd = process.cwd();
export default class SparrowTestComponent extends Component{
  name: string = 'sparrow-test-component';
  config: any = {};
  $fragment: any;
  vueParse: any;

  constructor (params: any, storge: any) {
    super(storge);
    this.initVueParse();
    const {initType} = params;
    if (initType === 'auto' ) {
      this.config = params;
    } else {
      this.config = _.cloneDeep(require('./config').default);
    }
    this.setAttrsToStr();
  }

  private initVueParse () {
    const fileStr:string = fsExtra.readFileSync(path.join(__dirname, '..', 'src/index.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr); 
  }

  public insertEditText (params) {
    this.config.model.custom.label = params.value;
  }


  public fragment () {

    const type = this.storage.get('preview_view_status') || 0;
    let divider = '';
    if (type === 0) {
      divider = `
      <div>
        <el-button :plain="true" @click="open">打开消息提示</el-button>
        <el-button :plain="true" @click="openVn">VNode</el-button>
      <div>`
    } else {
      divider = `
        <div>
          <el-button :plain="true" @click="open">打开消息提示</el-button>
          <el-button :plain="true" @click="openVn">VNode</el-button>
        <div>
      `;
    }
    return divider;
  }
}