const uuid = require('@lukeed/uuid');
import * as prettier from 'prettier';
import * as fsExtra from 'fs-extra';
import * as Path from 'path';

const cwd = process.cwd();
const viewPath = Path.join(cwd, '..', 'sparrow-view/src/views/api.js')

export default class Api {
  list:any = [];
  scene: any = null;
  constructor (scene: any) {
    this.scene = scene;
  }

  public resetScene (scene: any) {
    this.scene = scene;
  }

  async save (apiInfo, ctx) {
    const { socket } = ctx;
    if (apiInfo.id) {
      const findIndex = this.list.findIndex(item => item.id === apiInfo.id);
      this.list[findIndex] = apiInfo;
    } else {
      apiInfo.id =  uuid().split('-')[0];
      this.list.push(apiInfo);
    }

    this.generateApi();
    this.scene.appendApi(this.list);

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

      const formatTemp = prettier.format(apiTemp, { semi: true, parser: "babel" });
      fsExtra.writeFileSync(viewPath, formatTemp, 'utf8');
    });

    /**
     * 
     *  const template = `${this.$.html()}\n<script>${generate(this.scriptData).code}</script> <style lang="scss" scoped>${this.style || ''}</style>`;
    const formatTemp = prettier.format(template, { semi: true, parser: "vue" });
    if (formatTemp === this.formatTemp) {
      return;
    }
    this.formatTemp = formatTemp;
    if (this.isTime === false) {
      this.storageScene();
    }
    this.isTime = false;
    fsExtra.writeFileSync(viewPath, formatTemp, 'utf8');
     */

  }
}