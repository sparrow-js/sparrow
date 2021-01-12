import  VueParse from './VueParse';
const uuid = require('@lukeed/uuid');

export default class Vue2Dynamic{
  rootTemplate: string = '';
  vueParse: any;
  uuid:string = '';

  constructor (template: string = '') {
    this.rootTemplate = template;
    // this.vueParse = new VueParse();
  }
  
  templateParse () {

  }
  
  
}