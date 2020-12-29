import VueParse from '../generator/VueParse';
import generate from '@babel/generator';
import * as parser from '@babel/parser';

const uuid = require('@lukeed/uuid');

export default class LifeCycle {
  lifeCycleData: string = '';
  uuid: string = '';
  vueParse: any;
  name: string = 'lifeCycle';
  path: string = '/LifeCycle';
  config: any = {
    temp: ''
  };


  constructor (data: any = {}) {
    this.uuid = uuid().split('-')[0];
    const { config } = data;
    if (config) {
      this.config = config;
    } else {
      this.config.temp = `export default{
  data () {
    return {

    };
  }
}
      `;
    }

    this.parseToVueParse();
  }

  private handlerLifeCycle (data) {
    const {handler} = data;
    if (this[handler]) {
      return this[handler](data);
    }
  }

  private getData() {
    return new Function(`${this.vueParse.getFormatData()};return data;`)();
  }

  private parseToVueParse () {
    this.vueParse = new VueParse(this.uuid, `
      <script>
        ${this.config.temp}
      </script>
    `);
  }

  public setImport (importStr: string) {
    console.log('***********9********')
    this.vueParse.setImport(importStr);
  }

  public setCode (lifeCycleData: string) {
    this.config.temp = lifeCycleData;
    this.parseToVueParse();
  }

  public getCode () {
    console.log(generate(this.vueParse.scriptAst).code)
    return this.config.temp;
  }
  
}