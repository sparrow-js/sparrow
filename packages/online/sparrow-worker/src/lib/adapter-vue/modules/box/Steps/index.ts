const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';
import VueParse from '../../generator/VueParse';
import Config from '../../../config';
import Base from '../Base';
import Container from '../Container';
import * as _ from 'lodash';
import Step from './Step';
import Template from './template';

export default class Steps extends Base{
  $fragment = null;
  public components = [];
  name: string = 'Steps';
  config: any = {};
  vueParse: any;

  constructor (data: any, storage: any) {
    super(storage);
    const { params, config } = data;
    if (config) {
      this.config = config;
    } else {
      this.config = {};
      this.initComponent();
    }

    this.vueParse = new VueParse(this.uuid, Template.code); 
  }

  initComponent () {
    for(let i = 0; i < 3; i++) {
      this.components.push(new Step({name: `tab${i + 1}`}, this.storage));
    }
  }
  

  public setPreview () {
    const type = this.storage.get('preview_view_status').value() || 0;

    let TabsBox = '';

    TabsBox = `
      <el-steps :active="active" finish-status="success">
      </el-steps>
    `;

    this.$fragment = cheerio.load(TabsBox, {
      xmlMode: true,
      decodeEntities: false,
    });

    this.$fragment('el-steps').empty();
    this.components.forEach(item => {
      this.$fragment('el-steps').append(item.getFragment(0).html())
    });
  
  }
}