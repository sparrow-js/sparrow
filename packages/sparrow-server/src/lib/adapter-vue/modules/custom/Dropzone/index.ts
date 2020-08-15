import Common from '../Common';
import * as fsExtra from 'fs-extra';
import VueParse from '../../generator/VueParse';
import * as path from 'path';
import Config from '../../../config';


export default class Dropzone extends Common{
  name: string = 'Dropzone';
  params: any;
  vueParse: any;
  type: string;
  config: any;
  constructor (params: any = {}) {
    super();
    this.init();
  }
  
  private init () {
    const fileStr = fsExtra.readFileSync(path.join(Config.templatePath, 'Custom/Dropzone', 'comp.vue'), 'utf8');
    this.vueParse = new VueParse(this.uuid, fileStr);
  }

  public fragment () {
    return `
      <dropzone id="dropzone${this.uuid}" url="https://httpbin.org/post" @dropzone-removedFile="dropzoneR" @dropzone-success="dropzoneS" />
    `;
  }
}