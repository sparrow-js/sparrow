const uuid = require('@lukeed/uuid');
import * as _ from 'lodash';
import * as cheerio from 'cheerio';
import * as path from 'path';
import * as fsExtra from 'fs-extra';
import Block from './Block';

export default class Base {
  public uuid = '';
  components: any = [];
  storage: any = {};
  observe: any = null;
  $fragment: any = null;
  name: string = '';
  widgetType: string = 'box';
  treePath:string = ''; // 标记容器树路径
  previewType: number = 0;

  constructor (storage) {
    this.storage = storage;

    this.uuid = uuid().split('-')[0]; 
  }

  resetRender () {}

  public getFragment(index: number): any {
    let box = '';
    if (this.previewType === 0) {
      box = `
        <box 
          data-id="${this.uuid}"
          :uuid="'${this.uuid}'" 
          class="block-item" 
          :label="'${this.name}'"
        >
          ${this.$fragment.html()}
        </box>
      `
    } else {
      box = `
        <div>
          ${this.$fragment.html()}
        </div>
      `
    }
    return cheerio.load(`
          ${box}
      `, {
        xmlMode: true,
        decodeEntities: false
      });
    ;
  }
  

  public addComponent (data: any, operatetype: string = 'manual') {
    // if (operatetype === 'manual') {

      let { id, params = {}, nextSiblingId, config } = data;
      if (config) {
        config.initType = operatetype;
      }
      let compIndex = -2;
      if (nextSiblingId) {
        compIndex = this.components.findIndex(item => item.uuid === nextSiblingId);
      }

      const hasBox = fsExtra.pathExistsSync(path.join(__dirname, `../box/${id}`));
      let backComp = null;

      if (hasBox) {
        const dynamicObj = require(`../box/${id}`).default;
        const comp = new dynamicObj(config || params, this.storage)
        if (compIndex >= 0) {
          this.components.splice(compIndex, 0, comp)
        } else {
          this.components.push(comp);
        }
        backComp = comp;
      } else {
        const dynamicObj = require(`../component/${id}`).default;
        const comp = new dynamicObj(config || params, this.treePath);
        if (compIndex >= 0) {
          this.components.splice(compIndex, 0, comp)
        } else {
          this.components.push(comp);
        }
        backComp = null;
      }

      return backComp;
  
    // } else {
    //   let { id, config } = data;
      
    //   config.initType = operatetype;
    //   const dynamicObj = require(`../component/${id}`).default;
    //   const instance = new dynamicObj(config, this.treePath)
    //   this.components.push(instance);
    //   if (instance.storeType === 'box') {
    //     return instance;
    //   } else {
    //     return null;
    //   }
    // }
  }

  public async addBlock (params, ctx) {
    const {nextSiblingId} = params;
    const block = new Block(this.storage);
    let compIndex = -2;
    if (nextSiblingId) {
      compIndex = this.components.findIndex(item => item.uuid === nextSiblingId);
    }

    if (compIndex >= 0) {
      this.components.splice(compIndex, 0, block);
    } else {
      this.components.push(block);
    }

    
   
    await block.addBlock(params);
    const { socket } = ctx;
    socket.emit('generator.scene.block.status', {status: 0, data: {
      status: 2,
      message: 'complete',
    }});
  }

  getConfig () {}
}