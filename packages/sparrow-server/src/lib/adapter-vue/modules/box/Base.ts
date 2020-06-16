const uuid = require('@lukeed/uuid');
import { observable, observe } from '@nx-js/observer-util';
import * as _ from 'lodash';

export default class Base {
  public uuid = '';
  components: any = {};
  storage: any = {};
  constructor (storage) {
    this.storage = storage;

    this.uuid = uuid().split('-')[0]; 
  }

  resetRender () {}
  
  observeComp () {
    this.components = observable(this.components);
    observe(() => {
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