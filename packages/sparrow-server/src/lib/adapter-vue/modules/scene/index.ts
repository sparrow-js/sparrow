import * as path from 'path';
import * as fsExtra from 'fs-extra';
import * as parser from '@babel/parser';
import generate from '@babel/generator';
// import traverse from '@babel/traverse';
import {initBlock, blockList, paragraph} from '../fragment/scene';
import * as cheerio from 'cheerio';

import Box from '../box'
// cwd.split('sparrow-server')[0] + 'sparrow-view'
const cwd = process.cwd();
const viewPath = path.join(cwd, '..', 'sparrow-view/src/views/index.vue')


export default class Scene {
  boxs: any = [];
  blocks: any;
  methods: any;
  mixins: any;
  templateFilePath: string;
  templateData: any;
  scriptData: any;
  $: any;

  private blockMap = new Map();

  constructor () {
    this.templateFilePath = path.join(__dirname, '..', 'fragment/scene/template.vue');
    this.init();
  }

  private async init () {
    const fileStr = await fsExtra.readFile(this.templateFilePath, 'utf8');
    const templateStr = fileStr.match(/<template>([\s\S])*<\/template>/g)[0];
    const scriptStr = fileStr.match(/(?<=<script>)[\s\S]*(?=<\/script>)/g)[0];
    
    this.$ = cheerio.load(templateStr, {
      xmlMode: true
    });
    this.scriptData = parser.parse(scriptStr, {
      sourceType: 'module',
    });

    this.renderPage();

    /**
      traverse(this.scriptData, {
        enter(path) {
          // console.log(path);
          console.log('*******888*******');
        }
      });
      traverse
      const code = generate(this.scriptData).code;
      console.log(code);
     */
  }

  public addBox (id) {
    this.boxs.push(new Box(id));
    // this.renderPage();
  }

  public removeBox (index) {
    this.boxs.splice(index, 1);
  }

  public renderPage () {
    this.$('.home').append(initBlock(0));
    this.writeTemplate();
  }

  private writeTemplate () {
    const template = `${this.$.html()}\n<script>${generate(this.scriptData).code}</script>`
    fsExtra.writeFile(viewPath, template, 'utf8');
  }
}