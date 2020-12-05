import Common from '../Common';
import VueParse from '../../generator/VueParse';
import Config from '../../../config';
import Template from './template';


export default class Tinymce extends Common{
  name: string = 'Tinymce';
  params: any;
  vueParse: any;
  type: string;
  config: any;
  constructor (params: any = {}) {
    super();
    this.init();
  }
  
  private init () {
    // const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'Custom/Tinymce', 'index.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, Template.code);
  }

  public fragment () {
    return `
      <tinymce v-model="content" :height="300" />
    `;
  }
}