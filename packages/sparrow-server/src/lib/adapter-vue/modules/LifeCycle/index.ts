import VueParse from '../generator/VueParse';
const uuid = require('@lukeed/uuid');

export default class LifeCycle {
  lifeCycleData: string = `export default{
  data () {
    return {

    };
  }
}
  `;
  uuid: string = '';
  vueParse: any;
  name: string = 'lifeCycle';
  path: string = '/LifeCycle';


  constructor () {
    this.uuid = uuid().split('-')[0];
    this.parseToVueParse();
  }

  private parseToVueParse () {
    this.vueParse = new VueParse(this.uuid, `
      <script>
        ${this.lifeCycleData}
      </script>
    `);
  }

  public setCode (lifeCycleData: string) {
    this.lifeCycleData = lifeCycleData;
    this.parseToVueParse();
  }

  public getCode () {
    return this.lifeCycleData;
  }
  
}