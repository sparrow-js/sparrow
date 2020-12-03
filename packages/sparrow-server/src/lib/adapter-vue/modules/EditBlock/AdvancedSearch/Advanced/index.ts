import Common from '../../Common';
import * as fsExtra from 'fs-extra';
import * as path from 'path';
import Config from '../../../../config';
import VueParse from '../../../generator/VueParse';

export default class Advanced extends Common{
  name: string = 'Advanced';
  params: any;
  vueParse: any;
  type: string;
  config: any;
  constructor (params: any = {}) {
    super();
    this.init();
  }
  
  private init () {
    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'EditBlock/AdvancedSearch/Advanced', 'index.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr);
  }

  public fragment () {
    return `
      <el-link type="primary" @click="toggleAdvanced" style="margin-left: 8px">
        {{ advanced ? '收起' : '展开' }}
        <i v-if="advanced" class="el-icon-arrow-up" />
        <i v-else class="el-icon-arrow-down" />
      </el-link>
    `;
  }
}
