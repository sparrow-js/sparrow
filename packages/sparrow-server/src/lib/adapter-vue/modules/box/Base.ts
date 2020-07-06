const uuid = require('@lukeed/uuid');
import { observable, observe, unobserve } from '@nx-js/observer-util';
import * as _ from 'lodash';

export default class Base {
  public uuid = '';
  components: any = {};
  storage: any = {};
  observe: any = null;

  constructor (storage) {
    this.storage = storage;

    this.uuid = uuid().split('-')[0]; 
  }

  resetRender () {}
  
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