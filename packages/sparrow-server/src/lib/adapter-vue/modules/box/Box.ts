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

  constructor () {
    this.uuid = uuid().split('-')[0]; 
  }
  
  addComponent (data: any) {
    const curData = data;
    this.label = curData.key;
    const dynamicObj = require(`./${curData.id}`).default;
    this.components.push(new dynamicObj(curData, storage));
    this.renderTemplate();
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
      content = this.components[0].getFragment().html()
    }

    let box = '';
    if (this.type === 0) {
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
  }

  setPreview () {
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