const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';

export default class Box{
  public uuid = '';
  public components:any = [];
  public $fragment: any;
  name: string = 'box';

  constructor () {
    this.uuid = uuid().split('-')[0]; 
  }
  
  addComponent (data: any) {
    const curData = data;
    const dynamicObj = require(`./${curData.id}`).default;
    this.components.push(new dynamicObj(curData));
    this.renderTemplate();
  }

  renderTemplate () {
    if (!this.components[0]) {
      this.$fragment = cheerio.load(`
        <div class="block-list">
          <box :uuid="'${this.uuid}'" class="block-item">
            <paragraph 
              :type="'Container'" 
              :emit="'client.component.show'"
              :params="{uuid: '${this.uuid}'}"></paragraph>
          </box>
        </div>
      `, {
        xmlMode: true,
        decodeEntities: false
      });
    } else {
      this.$fragment =  cheerio.load(`
        <div class="block-list">
            <box :uuid="'${this.uuid}'" class="block-item">
              ${this.components[0].getFragment().html()}
            </box>  
        </div>
      `, {
        xmlMode: true,
        decodeEntities: false
      });
    }
  }

  getFragment () {
    this.renderTemplate();
    return this.$fragment;
  }
}