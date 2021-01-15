import  VueParse from './VueParse';
const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';

export default class Vue2Dynamic{
  rootTemplate: string = '';
  vueParse: any;
  uuid:string = '';
  $fragment: any;

  constructor (template: string = '') {
    this.uuid = uuid().split('-')[0]; 
    this.rootTemplate = template;
    this.vueParse = new VueParse(this.uuid, template);
    this.templateParse();
    this.injectionSlot();
    this.activeCode();
    console.log(this.$fragment.html());
  }
  
  templateParse () {
    this.$fragment = cheerio.load(this.vueParse.template, {
      xmlMode: true,
      decodeEntities: false,
    });
    // console.log('********', this.$fragment('template').toArray());
  }
  
  // 激活容器
  activeCode () {
    const activeNodeList = [
      'el-form',
      's-box',
    ];
    activeNodeList.forEach(key => {
      const currentNode = this.$fragment(key);
      currentNode.attr('data-design-mode', 'design-border-box');
      currentNode.attr('data-instance-name', key);
      currentNode.attr('data-type', 'box');
      /***
       *  
      this.$fragment.root().children().attr('data-id', this.uuid);
       */
    });
  }
  
  // 注入占位
  injectionSlot () {
    this.$fragment('template').children('div').append('<div class="test">test</div>')
  }

  public getFragment(index: number): any {
    return this.$fragment;
  }
}