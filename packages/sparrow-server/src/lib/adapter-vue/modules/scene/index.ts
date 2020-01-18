import * as path from 'path';
import * as fsExtra from 'fs-extra';
import * as parser from '@babel/parser';
import generate from '@babel/generator';
// import traverse from '@babel/traverse';
import {initBlock, blockList, paragraph} from '../fragment/scene';
import * as cheerio from 'cheerio';
import * as prettier from 'prettier';
import {appendComponent, getScript, setInitScript} from './generatorAst';
import * as upperCamelCase from 'uppercamelcase';

import Box from '../box'
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
  boxInstance: any;

  private blockMap = new Map();

  constructor () {
    this.templateFilePath = path.join(__dirname, '..', 'fragment/scene/template.vue');
    this.boxInstance = new Box;
    this.init();
  }

  private async init () {
    const fileStr = await fsExtra.readFile(this.templateFilePath, 'utf8');
    const templateStr = fileStr.match(/<template>([\s\S])*<\/template>/g)[0];
    const scriptStr = fileStr.match(/(?<=<script>)[\s\S]*(?=<\/script>)/g)[0];
    
    this.$ = cheerio.load(templateStr, {
      xmlMode: true,
      decodeEntities: false
    });
    this.scriptData = getScript();

    this.renderPage();
  }

  public addBox (data: any) {
    const curData = data.data;
    const { boxIndex } = curData;
    if (this.boxs[boxIndex] === undefined) {
      this.boxs.push(this.boxInstance.createBox(curData));
    } else {
      this.boxs[boxIndex] = this.boxInstance.createBox(data);
    }
    this.renderPage();
  }

  public removeBox (index) {
    this.boxs.splice(index, 1);
  }

  public addComponent (params) {
    const {boxIndex, data} = params;
    this.boxs[boxIndex].addComponent(data);
    this.renderPage();
    return {
      status: 0
    };
  }

  public async addBlock (params) {
    const {boxIndex, data} = params;
    await this.boxs[boxIndex].addBlock(data);
    this.renderPage();
  }

  public async renderPage () {
    this.$('.home').empty();
    setInitScript();

    await Promise.all(this.boxs.map(async (item, index) => {
      const blockListStr = blockList(index, item.getBoxFragment().html());
      this.$('.home').append(blockListStr);
      if (item.insertComponents && item.insertComponents.length) {
        await appendComponent(upperCamelCase(item.insertComponents[0]));
      }
    }))
    
    this.scriptData = getScript();

    this.$('.home').append(initBlock(this.boxs.length));
    this.writeTemplate();
  }

  private writeTemplate () {
    const template = `${this.$.html()}\n<script>${generate(this.scriptData).code}</script>`;
    console.log(generate(this.scriptData).code);
    const formatTemp = prettier.format(template, { semi: true, parser: "vue" });
    fsExtra.writeFile(viewPath, formatTemp, 'utf8');
  }
}