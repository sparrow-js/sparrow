const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';

export default class DialogBox{
  public uuid = '';

  constructor () {
    this.uuid = uuid().split('-')[0];
  }
  

}