const uuid = require('@lukeed/uuid');
import { observable, observe, unobserve } from '@nx-js/observer-util';
import * as _ from 'lodash';
import * as cheerio from 'cheerio';
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

  constructor (storage) {
    this.storage = storage;

    this.uuid = uuid().split('-')[0]; 
  }

  resetRender () {}

  public getFragment(index: number): any {
    const box = `
      <box 
        data-id="${this.uuid}"
        :uuid="'${this.uuid}'" 
        class="block-item" 
        :label="'${this.name}'"
      >
        ${this.$fragment.html()}
      </box>
    `
    return cheerio.load(`
          ${box}
      `, {
        xmlMode: true,
        decodeEntities: false
      });
    ;
  }
  

  public addComponent (data: any, operatetype: string = 'manual') {
    if (operatetype === 'manual') {

      let { id, type, params = {}, nextSiblingId } = data;
      let compIndex = -2;
      if (nextSiblingId) {
        compIndex = this.components.findIndex(item => item.uuid === nextSiblingId);
      }

      if (type === 'box') {
        const dynamicObj = require(`../box/${id}`).default;
        const comp = new dynamicObj(params, this.storage)
        if (compIndex >= 0) {
          this.components.splice(compIndex, 0, comp)
        } else {
          this.components.push(comp);
        }
      } else {
        const dynamicObj = require(`../component/${id}`).default;
        const comp = new dynamicObj(params, this.treePath);
        if (compIndex >= 0) {
          this.components.splice(compIndex, 0, comp)
        } else {
          this.components.push(comp);
        }
      }
  
    } else {
      let { id, config } = data;
      
      config.initType = operatetype;
      const dynamicObj = require(`../component/${id}`).default;
      const instance = new dynamicObj(config, this.treePath)
      this.components.push(instance);
      if (instance.storeType === 'box') {
        return instance;
      } else {
        return null;
      }
    }
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

  observeComp () {
    if (this.observe) {
      unobserve(this.observe);
    }

    this.components = observable(this.components);
    this.observe = observe(() => {
      if (Array.isArray(this.components)) {
        this.resetRender();
      } else {
        if (!_.isEmpty(this.components)) {
          this.resetRender();
        }
      }
    });
  }

  getConfig () {}
}