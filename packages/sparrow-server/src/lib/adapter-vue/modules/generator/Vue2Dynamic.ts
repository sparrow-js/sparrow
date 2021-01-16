import  VueParse from './VueParse';
const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';
import Container from '../box/Container';
import storage from '../../../storage';

export default class Vue2Dynamic{
  rootTemplate: string = '';
  vueParse: any;
  uuid:string = '';
  $fragment: any;
  components: any = [];
  widgetType: string = 'DVue';
  dComponents: any = [];

  constructor (template: string = '') {
    this.uuid = uuid().split('-')[0]; 
    this.rootTemplate = template;
    this.vueParse = new VueParse(this.uuid, template);
    this.templateParse();
    this.injectionSlot();
    this.activeCode();
    this.components.push(new Container({}, storage));
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
    this.$fragment('template').children('div').append('<div class="drag-box">empty</div>')
  }

  public setPreview () {
    this.renderComp();
  }

  public renderComp () {
    this.$fragment('.drag-box').first().empty();
    this.components.forEach(component => {
      this.$fragment('.drag-box').first().append(component.getFragment(0).html());
    });

    if (this.components.length  === 0) {
      this.$fragment('.drag-box').attr('data-empty', true);
    }
  }

  public addComponent (data) {}


  public getFragment(index: number): any {
    return this.$fragment;
  }

}