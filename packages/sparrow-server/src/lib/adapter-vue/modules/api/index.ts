import VueParse from '../generator/VueParse';
import {getApiTemp} from './ApiStr';
const uuid = require('@lukeed/uuid');

export default class ApiComp {
  uuid: string = '';
  vueParse: any;
  name: string = 'api';
  path: string = '/api';
  config: any = {
    list: []
  };

  constructor (data: any = {}) {
    this.uuid = uuid().split('-')[0];
    const { config } = data;
    if (config) {
      this.config = config;
    }
    this.renderApi();
  }

  public handlerApi (data) {
    const {handler} = data;
    if (this[handler]) {
      return this[handler](data);
    }
  }


  async save (data) {
    const {list} = this.config;
    if (data.id) {
      const findIndex = list.findIndex(item => item.id === data.id);
      list[findIndex] = data;
    } else {
      data.id =  uuid().split('-')[0];
      list.push(data);
    }

    this.renderApi()

    return {
      status: 0,
      data: {
        id: data.id
      }
    }
  }

  delete ({id}) {
    const {list} = this.config;
    const findIndex = list.findIndex(item => item.id === id);
    list.splice(findIndex);
    this.renderApi()
    return {
      status: 0
    }
  }

  getList () {
    const {list} = this.config;
    return {
      list,
      status: 0,
    }
  }

  private renderApi () {
    const apiMethodList = [];
    const apiMethodNameList = [];
    const {list} = this.config;
    list.forEach(item => {
      apiMethodNameList.push(item.methodName);
      if (item.apiType) {
        apiMethodList.push(getApiTemp(item.apiType, item.methodName));
        return;
      }

      if (item.methodType === 'get') {
        apiMethodList.push(
          `
            async ${item.methodName}() {
              const res = await ${item.methodName}(this.listQuery);
            }
          `
        )
      } else {
        apiMethodList.push(
          `
            async ${item.methodName}() {
              const res = await ${item.methodName}(this.form);
            }
          `
        )
      }
 
    });

    let importApi = '';
    if (apiMethodNameList.join(',')) {
      importApi = ` import {${apiMethodNameList.join(',')}} from '@/views/api';`;
    }

    const apiMethod = `
      <script>
        ${importApi}
        export default{
          methods: {
            ${apiMethodList.join(',')}
          }
        }
      </script>
    `;

    this.vueParse = new VueParse(this.uuid, apiMethod);
  }

}