const uuid = require('@lukeed/uuid');
import { observable, observe, unobserve } from '@nx-js/observer-util';
import * as _ from 'lodash';
import * as cheerio from 'cheerio';

export default class Base {
  public uuid = '';
  components: any = {};
  storage: any = {};
  observe: any = null;
  $fragment: any = null;
  name: string = '';
  widgetType: string = 'box';

  constructor (storage) {
    this.storage = storage;

    this.uuid = uuid().split('-')[0]; 
  }

  resetRender () {}

  public getFragment(index: number): any {
    console.log('******567******', this.name)
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
    <div class="block-list">
          ${box}
        </div>
      `, {
        xmlMode: true,
        decodeEntities: false
      });
    ;
  }
  

  public addComponent (data: any, type: string = 'manual') {
    if (type === 'manual') {
      let { id, params = {} } = data;
      const dynamicObj = require(`../component/${id}`).default;
      this.components.push(new dynamicObj(params))
    } else {
      let { id, config } = data;
      config.initType = type;
      const dynamicObj = require(`../component/${id}`).default;
      const instance = new dynamicObj(config)
      this.components.push(instance);
      if (instance.storeType === 'box') {
        return instance;
      } else {
        return null;
      }
    }
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