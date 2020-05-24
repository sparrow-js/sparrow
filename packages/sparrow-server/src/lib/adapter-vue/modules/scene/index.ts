import * as path from 'path';
import * as fsExtra from 'fs-extra';
import generate from '@babel/generator';
import {initBlock, blockList, paragraph} from '../fragment/scene';
import * as cheerio from 'cheerio';
import * as prettier from 'prettier';
import * as upperCamelCase from 'uppercamelcase';
import VueGenerator from '../generator';
import VueParse from '../generator/VueParse';
const uuid = require('@lukeed/uuid');
import Config from '../../config';

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
  sceneVueParse: any = null;
  params: any = {
    previewViewStatus: 0
  };
  tree: any;

  private blockMap = new Map();

  constructor (params: any = {}) {
    this.boxInstance = new Box();
    this.VueGenerator = new VueGenerator();
    this.init();
    const {boxs, name} = params;
    if (name) {
      const fileStr = fsExtra.readFileSync(path.join(Config.templatePath,'scene', name,'index.vue'), 'utf8');
      this.sceneVueParse = new VueParse(uuid().split('-')[0], fileStr);
    }
    if (boxs && boxs.length) {
      boxs.forEach(item => {
        this.initBox(item);
      });
      this.renderPage();
    }
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

  public initBox (data: any) {
    const curData = data.data;
    const { boxIndex } = curData;
    if (this.boxs[boxIndex] === undefined) {
      this.boxs.push(this.boxInstance.createBox(curData));
    } else {
      this.boxs[boxIndex] = this.boxInstance.createBox(curData);
    }
  }

  public addBox (data: any) {
    const curData = data.data;
    const { boxIndex } = curData;
    if (this.boxs[boxIndex] === undefined) {
      this.boxs.push(this.boxInstance.createBox(curData));
    } else {
      this.boxs[boxIndex] = this.boxInstance.createBox(curData);
    }
    this.renderPage();
  }

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

  public async setting (params: any) {
    const {boxIndex, data} = params;
    if (boxIndex >= 0 && this.boxs[boxIndex].setting) {
      await this.boxs[boxIndex].setting(data);
      return {
        status: 0
      }
    }
    return {
      status: 1
    }
  }

  public async settingConfig (params: any) {
    const {data} = params;
    const currentComp = this.findComponent(data.uuid, this.boxs);
    if (currentComp) {
      currentComp.settingConfig(data);
    }
  }

  private findComponent (uuid, components) {
    let tempComp = null;

    const fn = function (uuid, components) {
      if (tempComp === null) {
        if (Array.isArray(components)) {
          components.forEach(item => {
            if (item.uuid === uuid) {
              tempComp = item;
            }
  
            if (item.components && tempComp === null) {
              fn(uuid, item.components)
            }
          });
        } else {
          if(components.uuid === uuid) {
            tempComp = components;
          }
        }
      }
    }

    fn(uuid, components);
    return tempComp;
  }

  public getSetting (params) {
    const { boxIndex } = params;
    if (boxIndex >= 0) {
      return this.boxs[boxIndex].getSetting();
    }
  }

  public getBoxChildConfig (params) {
    const {boxIndex} = params;
    if (this.boxs[boxIndex].getBoxChildConfig) {
      return this.boxs[boxIndex].getBoxChildConfig(params);
    }
  }

  public getParams () {
    return this.params;
  }

  public getSceneTree (node) {
    this.tree = {
      label: 'page',
      children: []
    };

    this.boxs.forEach(item => {
      this.tree.children.push(this.getTree(item));
    });

    return this.tree;
  }

  private getTree (node) {
    if (!node) return null;
    const tree = {
      label: '',
      id: '',
      children: []
    };
    if (node.name) {
      tree.label = node.name;
    }
    if (node.uuid) {
      tree.id = node.uuid
    }

    if (node.components) {
      if (Array.isArray(node.components)) {
        node.components.forEach(node => {
          tree.children.push(this.getTree(node));
        })
      } else {
        Object
          .keys(node.components)
          .forEach((key, index) => {
            tree.children.push(this.getTree({
              name: 'column',
              id: key,
              components: node.components[key]
            }));
          });
      }
    } else {
      this.getTree(null);
    }

    return tree;
  }

  private deleteNode (node, id, flag = 0) {
    if (!node || !node.uuid) {
      return;
    }
    flag = 0;
    if (node.components) {

      if (Array.isArray(node.components)) {
        node.components.forEach((item, index) => {
          if (item.uuid === id) {
            index = index;
            node.components.splice(index, 1);
            flag = 1;      
          }
          if (flag === 0) {
            this.deleteNode(item, id, flag);
          } 
        });
      } else {
        let index = null;
        Object
          .keys(node.components)
          .forEach(key => {
            node.components[key] && node.components[key].forEach((item, index) => {
              if (item.uuid === id) {
                index = index
                flag = 1;
                node.components[key].splice(index, 1);
              }
              if (flag === 0) {
                this.deleteNode(item, id, flag);
              } 
            });
          });
      }
    } else {
      this.deleteNode(null, '');
    }
  };
  
  public deleteComponent (params: {id: string}) {
    const {id} = params;
    this.deleteNode({
      uuid: 'page',
      components: this.boxs
    }, id);
    this.renderPage();
  }

  public async renderPage (renderType: number = 0) {
    this.params.previewViewStatus = renderType;
    this.$('.home').empty();
    this.scriptData = this.VueGenerator.initScript();
    let methods = [];
    this.boxs.map((item, index) => {
      item.setPreview && item.setPreview(renderType);
      const blockListStr = blockList(index, item.getBoxFragment(index, renderType).html());
      this.$('.home').append(blockListStr);

      if (item.insertComponents && item.insertComponents.length) {
        this.VueGenerator.appendComponent(upperCamelCase(item.insertComponents[0]));
      }

      if (item.type === 'inline' && item.components) {
        item.components.forEach(comp => {
          methods = methods.concat(comp.vueParse.methods || []);
        })
      }

    });
    if (this.sceneVueParse) {
      // appendMethods
      this.sceneVueParse.methods && this.VueGenerator.appendMethods(this.sceneVueParse.methods);
      this.sceneVueParse.data && this.VueGenerator.appendData(this.sceneVueParse.data);
      this.VueGenerator.appendMethods(methods);
    }
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