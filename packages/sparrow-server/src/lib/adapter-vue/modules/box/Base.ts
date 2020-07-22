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
  
  /**
   *  if (this.type === 0) {
      box = `
        <box 
          :uuid="'${this.uuid}'" 
          class="block-item" 
          :label="'${this.label}'"
        >
          ${content}
        </box>
      `
    } else {
      box = content
    }
    this.$fragment =  cheerio.load(`
      <div class="block-list">
        ${box}
      </div>
    `, {
      xmlMode: true,
      decodeEntities: false
    });
   */

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
    <div class="block-list">
          ${box}
        </div>
      `, {
        xmlMode: true,
        decodeEntities: false
      });
    ;
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
}