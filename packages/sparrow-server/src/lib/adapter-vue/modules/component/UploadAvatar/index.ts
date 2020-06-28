import * as fsExtra from 'fs-extra';
import Base from '../Base';
import VueParse from '../../generator/VueParse';
import * as path from 'path';
import Config from '../../../config';

export default class UploadAvatar extends Base{
  name: string = 'UploadAvatar';
  vueParse: any;
  constructor (params: any) {
    super();
    this.config = {
      // 组件自定义配置
      _custom: {
        required: false,
        regList: [],
        label: '上传头像',
      },
      // 组件标签属性
      _attr: {
        action: '',
        ':show-file-list': false,
        'v-model': params['v-model'] || ''
      },
    };
    this.init();
  }

  private init () {
    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'component/UploadAvatar', 'comp.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr);
  }

  public fragment () {
    return `
      <el-form-item label=" ">
        <label-box 
          label="${this.config._custom.label}"
          uuid="${this.uuid}"
        ></label-box>
       
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess${this.uuid}"
          :before-upload="beforeAvatarUpload${this.uuid}">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    `;
  }
}