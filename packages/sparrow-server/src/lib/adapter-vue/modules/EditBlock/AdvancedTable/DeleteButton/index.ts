import * as fsExtra from 'fs-extra';
import VueParse from '../../../generator/VueParse';
import * as path from 'path';
import Config from '../../../../config';
import Button from '../../../component/Button';


export default class DeleteButton extends Button{
  name: string = 'DeleteButton';
  vueParse: any;
  widgetType: string = 'EditBlock';

  constructor (params: any) {
    super(params)
    this.config.model.custom.label = '删除';
    this.config.model.attr.size = 'mini';
    this.config.model.attr.type = 'danger';
    this.setAttrsToStr();
    this.init();
  }
  
  private init () {
    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'EditBlock/AdvancedTable/DeleteButton',  'index.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr);
  }

  public fragment () {
    const type = this.storage.get('preview_view_status') || 0;
    let textBox = '';
    if (type === 0) {
      textBox = `<edit-text-box :clearClass="true" uuid="${this.uuid}">${this.config.model.custom.label}</edit-text-box>`
    } else {
      textBox = this.config.model.custom.label;
    }
    return `
      <el-popconfirm
        title="确定删除吗？"
        @onConfirm="remove(row.id)"
      >
        <el-button slot="reference" ${this._attrStr}>
          ${textBox}
        </el-button>
      </el-popconfirm>
    `;
  }
}