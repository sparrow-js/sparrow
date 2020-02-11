import * as path from 'path';
import * as fsExtra from 'fs-extra';
import generate from '@babel/generator';
import {initBlock, blockList, paragraph} from '../fragment/scene';
import * as cheerio from 'cheerio';
import * as prettier from 'prettier';
import * as upperCamelCase from 'uppercamelcase';
import VueGenerator from '../generator';

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
  VueGenerator: any;

  private blockMap = new Map();

  constructor () {
    this.boxInstance = new Box;
    this.VueGenerator = new VueGenerator();
    this.init();
  }

  private async init () {
    const templateStr =  `
      <template>
        <div class="home">
        </div>
      </template>
    `;
    this.$ = cheerio.load(templateStr, {
      xmlMode: true,
      decodeEntities: false
    });
    this.scriptData = this.VueGenerator.initScript();

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
  /**
   * 
   * @param data 
   * {
      handler: 'generator.scene.bottomBox',
      data: { boxIndex: 0 },
      uniqueId: 'message_5'
    }
   */

  public bottomBox (params: any) {
    const { data } = params;
    const boxIndex = data.boxIndex;
    if (this.boxs.length > boxIndex + 1) {
      const temp = this.boxs[boxIndex];
      this.boxs[boxIndex] = this.boxs[boxIndex + 1];
      this.boxs[boxIndex + 1] = temp;
      this.renderPage();
    }
  }

  public removeBox (params: any) {
    const { data } = params;
    this.boxs.splice(data.boxIndex, 1);
    this.renderPage();
  }

  public async topBox (params: any) {
    const { data } = params;
    const boxIndex = data.boxIndex;
    if (boxIndex > 0) {
      const temp = this.boxs[boxIndex];
      this.boxs[boxIndex] = this.boxs[boxIndex - 1];
      this.boxs[boxIndex - 1] = temp;
      this.renderPage();
    }
  }


  public addComponent (params) {
    const {boxIndex, data} = params;
    this.boxs[boxIndex].addComponent(data);
    this.renderPage();
    return {
      status: 0
    };
  }

  public async addBlock (params, ctx) {
    const {boxIndex, data} = params;
    await this.boxs[boxIndex].addBlock(data);
    this.renderPage();
    const { socket } = ctx;
    socket.emit('generator.scene.block.status', {status: 0, data: {
      status: 2,
      message: 'complete',
    }});
  }

  public async setting () {
    console.log('******9*******');
  }


  public async renderPage (renderType: number = 0) {
    this.$('.home').empty();
    this.scriptData = this.VueGenerator.initScript();

    this.boxs.map(async (item, index) => {
      if (renderType === 0) {
        const blockListStr = blockList(index, item.getBoxFragment(index).html());
        this.$('.home').append(blockListStr);
      } else {
        const blockListStr = blockList(index, item.template);
        this.$('.home').append(blockListStr);
      }

      if (item.insertComponents && item.insertComponents.length) {
        this.VueGenerator.appendComponent(upperCamelCase(item.insertComponents[0]));
      }
    });
    if (renderType === 0) {
      this.$('.home').append(initBlock(this.boxs.length));
    }
    this.writeTemplate();
  }

  private writeTemplate () {
    const template = `${this.$.html()}\n<script>${generate(this.scriptData).code}</script>`;
    const formatTemp = prettier.format(template, { semi: true, parser: "vue" });
    fsExtra.writeFile(viewPath, formatTemp, 'utf8');
  }
}