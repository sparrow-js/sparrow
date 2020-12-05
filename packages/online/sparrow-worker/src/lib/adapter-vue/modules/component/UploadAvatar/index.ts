import Base from '../Base';
import VueParse from '../../generator/VueParse';
import Config from '../../../config';
import * as _ from 'lodash';

export default class UploadAvatar extends Base{
  name: string = 'UploadAvatar';
  vueParse: any;
  constructor (params: any, boxPath: string) {
    super(boxPath);
    if (params.initType === 'auto') {
      this.config = params;
    } else {
      this.config = _.cloneDeep(require('./config'));
    }
    
    this.init();
  }

  private init () {
    // const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'component/UploadAvatar', 'comp.vue'), 'utf8');
    // this.vueParse = new VueParse(this.uuid, fileStr);
  }

  public fragment () {
    return `       
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess${this.uuid}"
        :before-upload="beforeAvatarUpload${this.uuid}">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    `;
  }
}