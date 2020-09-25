const uuid = require('@lukeed/uuid');

export default class Api {
  list:any = [];

  constructor () {}

  save (apiInfo, ctx) {
    const { socket } = ctx;
    if (apiInfo.id) {
      const findIndex = this.list.findIndex(item => item.id === apiInfo.id);
      this.list[findIndex] = apiInfo;
    } else {
      apiInfo.id =  uuid().split('-')[0];
      this.list.push(apiInfo);
    }

    this.generateApi();

    return {
      status: 0,
      data: {
        id: apiInfo.id
      }
    }
  }

  delete (id) {
    const findIndex = this.list.findIndex(item => item.id === id);
    this.list.splice(findIndex);
    this.generateApi();
    return {
      status: 0
    }
  }


  getList () {
    return {
      list: this.list,
      status: 0,
    }
  }

  private generateApi () {
    let apiTemp = `import request from '@/utils/request'`;
    this.list.forEach(item => {
      if (item.methodType === 'get') {
        apiTemp += `
          export function ${item.methodName}(params) {
            return request({
              url: '${item.url}',
              method: '${item.methodType}',
              params
            })
          }
        `;

      } else if (item.methodType === 'post') {
        apiTemp += `
          export function ${item.methodName}(data) {
            return request({
              url: '${item.url}',
              method: '${item.methodType}',
              data
            })
          }
        `;
      }
   
    });
    console.log('*********', apiTemp)
  }


}