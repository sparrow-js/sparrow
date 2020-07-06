const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';
import storage from '../../../storage';

export default class Box{
  public uuid = '';
  public components:any = [];
  public $fragment: any;
  name: string = 'box';
  label: string = '';
  type: number = 0;
  unique: string | number;
  toggle: boolean = false;
  enableToggle: boolean = true;


  constructor (enableToggle: boolean = true) {
    this.enableToggle = enableToggle;
    this.uuid = uuid().split('-')[0]; 
  }
  
  addComponent (data: any) {
    const curData = data;
    this.label = curData.key || curData.id;
    const dynamicObj = require(`./${curData.id}`).default;
    const obj = new dynamicObj(curData, storage)
    this.components.push(obj);
    this.renderTemplate();
    // force refresh
    return obj;
  }

  renderTemplate () {
    this.type = storage.get('preview_view_status') || 0;
    let content = '';
    if (!this.components[0]) {
      content = `
        <paragraph 
          :type="'Container'" 
          :emit="'client.component.show'"
          :params="{uuid: '${this.uuid}'}"></paragraph>
      `
    } else {
      content = this.components[0].getFragment() && this.components[0].getFragment().html()
    }


    let toggleView = '';


    if (this.toggle === true && this.enableToggle === true) {
      // toggleView = '<div></div>';
    }
    this.toggle = !this.toggle;

    let box = '';
    
    if (this.type === 0) {
      box = `
        <box 
          :uuid="'${this.uuid}'" 
          class="block-item" 
          :label="'${this.label}'"
        >
          ${toggleView}
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
  }

  setPreview () {
    // this.renderTemplate();
    if (this.components[0] && this.components[0].setPreview) {
      this.components[0].setPreview();
    }
  }
  
  getFragment () {
    this.renderTemplate();
    return this.$fragment;
  }

  getFragmentOther () {
    if (this.components[0]) {
      return this.components[0].getFragmentOther(); 
    }
    return null;
  }
}