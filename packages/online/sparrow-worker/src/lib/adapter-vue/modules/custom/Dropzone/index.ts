import Common from '../Common';
import VueParse from '../../generator/VueParse';
import Template from './template';


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
    this.vueParse = new VueParse(this.uuid, Template.code);
  }

  public fragment () {
    return `
      <dropzone id="dropzone${this.uuid}" url="https://httpbin.org/post" @dropzone-removedFile="dropzoneR" @dropzone-success="dropzoneS" />
    `;
  }
}