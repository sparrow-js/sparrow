const uuid = require('@lukeed/uuid');

export default class Base {
  public uuid = '';
  constructor () {
    this.uuid = uuid().split('-')[0]; 
  }
}