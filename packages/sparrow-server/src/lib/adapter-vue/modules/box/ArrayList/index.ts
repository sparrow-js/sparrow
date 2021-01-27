const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';
import * as fsExtra from 'fs-extra';
import Config from '../../../config';
import * as path from 'path';
import Container from '../Container'
import Base from '../Base';


export default class ArrayList extends Base{
  $fragment = null;
  public components = [];
  name: string = 'ArrayList';
  insertComponents:string[] = [];
  config: any = {};
  constructor (data: any, storage: any) {
    super(storage)
    const { config } = data;
    if (config) {
      this.config = config
    } else {
      this.config = {};

      this.insertComponents.push('ArrayList');
      const componentsDir = Config.componentsDir; 
      console.log('*****8******', componentsDir);
      const compDir = path.join(componentsDir, 'ArrayList')
      fsExtra.copySync(path.join(Config.serverBusinessPath, 'ArrayList'), compDir)
      this.initComponent();
    }
  
  }

  initComponent () {
    const curBox = new Container({}, this.storage)
    this.components.push(curBox);
    return curBox;
  }
  

  public renderBox () {
    if (!this.components[0]) return;
    let LogicBox = this.components[0].getFragment().html();


  let arrayListBox = `
    <array-list>
      <template v-slot:item="{ item }">
        ${LogicBox}
      </template>
    </array-list>
  `;

    const type = this.storage.get('preview_view_status') || 0;
  

    this.$fragment = cheerio.load(arrayListBox, {
      xmlMode: true,
      decodeEntities: false,
    });

  }
  
  
  public getFragment () {
    this.renderBox();
    return this.$fragment;
  }


  public insertEditText (params) {
    this.config._attr.label = params.value;
  }

}