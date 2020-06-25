import * as path from 'path';
import * as fsExtra from 'fs-extra';
import generate from '@babel/generator';
import {initBlock, blockList} from '../fragment/scene';
import * as cheerio from 'cheerio';
import * as prettier from 'prettier';
import * as upperCamelCase from 'uppercamelcase';
import VueGenerator from '../generator';
import VueParse from '../generator/VueParse';
const uuid = require('@lukeed/uuid');
import Config from '../../config';
import Box from '../box/Box';
import storage from '../../../storage';
const cwd = process.cwd();
const viewPath = path.join(cwd, '..', 'sparrow-view/src/views/index.vue')

export default class Scene {
  components: any = [];
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
  uuid: string = '';

  constructor (params: any = {}) {
    this.uuid = uuid().split('-')[0];
    this.VueGenerator = new VueGenerator();
    const {boxs, name} = params;
    storage.set('preview_view_status', 0);

    this.init();

    if (name) {
      const fileStr = fsExtra.readFileSync(path.join(Config.templatePath,'scene', name,'index.vue'), 'utf8');
      this.sceneVueParse = new VueParse(uuid().split('-')[0], fileStr);
    }
    if (boxs && boxs.length) {
      this.jsonToObj(boxs)
    }
    this.components.push(new Box());
    this.renderPage();
  }

  private jsonToObj (boxs: any) {
    boxs.forEach(item => {
      const box = new Box();
      box.addComponent(item.data)
      this.components.push(box);
    });
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
  }

  loopThroughBox (boxs: any,) {
    const fn = function (boxs) {
      if (Array.isArray(boxs)) {
        boxs.forEach(item => {
          if (item.name === 'box') {
            item.setPreview && item.setPreview();
          }
          if (
            item.name === 'box' 
            && item.components[0] 
            && item.components[0].components
          ) {
            fn(item.components[0].components)
          }
        });
      } else {
        Object
        .keys(boxs)
        .forEach(key => {
          if (Array.isArray(boxs[key])) {
            fn(boxs[key]);
          }
        })
      }
    }

    fn(boxs);
  }
  
  public findBox (uuid: string, boxs: any) {
    let tempBox = null;

    const fn = function (uuid, boxs) {
      if (tempBox === null) {
        if (Array.isArray(boxs)) {
          boxs.forEach(item => {
            if (item.uuid === uuid) {
              tempBox = item;
            }

            if (
              item.name === 'box' 
              && item.components[0] 
              && item.components[0].components
            ) {
              fn(uuid, item.components[0].components)
            }
          });
        } else {
          Object
          .keys(boxs)
          .forEach(key => {
            if (Array.isArray(boxs[key])) {
              fn(uuid, boxs[key]);
            }
          })
        }

        /**
         *  else if (boxs.uuid) {
              if(boxs.uuid === uuid) {
                tempBox = boxs;
              }
            }
         */
      }
    }

    fn(uuid, boxs);
    return tempBox;
  }
  

  public findBoxParent (uuid: string, boxs: any) {
    let tempBox = null;

    const fn = function (uuid, boxs) {
      if (tempBox === null) {
        if (Array.isArray(boxs)) {
          boxs.forEach(item => {
            if (item.uuid === uuid) {
              tempBox = boxs;
            }

            if (item.name === 'box' && item.components[0] && item.components[0].components && tempBox === null) {
              fn(uuid, item.components[0].components)
            }
          });
        } else {
          Object
          .keys(boxs)
          .forEach(key => {
            if (Array.isArray(boxs[key])) {
              fn(uuid, boxs[key]);
            }
          })
        }
      }
    }

    fn(uuid, boxs);
    return tempBox;
  }

  changePosition (params) {

    const { uuid, order, label} = params;
    if (label === 'page') {
      const components = order.reduce((total, key)=> {
        total.push(this.components.find(comp => comp.uuid === key));
        return total;
      }, []);
      this.components = components;
    }
    const currBox = this.findBox(uuid, this.components);
    if (currBox && currBox.components[0].changePosition) {
      currBox.components[0].changePosition(order);
      this.renderPage();
    } else {
      return {
        status: 1,
        message: '暂不支持拖拽'
      }
    }
  }

  public addBox (params: any) {
    const {boxUuid, data} = params;
    if (boxUuid) {
      const currBox = this.findBox(boxUuid, this.components);
      currBox.addComponent(data);
      const curBoxParent = this.findBoxParent(boxUuid, this.components)
      curBoxParent.push(new Box());
      this.renderPage();
    }
  }

  public addComponent (params) {
    const { data, boxUuid} = params;
    const currBox = this.findBox(boxUuid, this.components);
    if (currBox) {
      currBox.components[0].addComponent(data);
      this.renderPage();
    }
  }

  public async addBlock (params, ctx) {
    const {data, boxUuid} = params;
    if (boxUuid) {
      const currBox = this.findBox(boxUuid, this.components);
      await currBox.components[0].addBlock(data);
      this.renderPage();
    }

    const { socket } = ctx;
    socket.emit('generator.scene.block.status', {status: 0, data: {
      status: 2,
      message: 'complete',
    }});
  }


  public async setting (params: any) {

    const { data, boxUuid} = params;
    const curBox = this.findBox(boxUuid, this.components);
    if (curBox && curBox.components[0]) {
      await curBox.components[0].setting(data);
      this.renderPage();
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
    const currentComp = this.findComponent(data.uuid, this.components);
    if (currentComp && currentComp.settingConfig) {
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
    const { boxUuid } = params;
    
    const curBox = this.findBox(boxUuid, this.components);
    if (curBox && curBox.components[0]) {
      return curBox.components[0].getSetting()
    }
  }

  public getBoxChildConfig (params) {
    const {boxUuid} = params;
    const curBox = this.findBox(boxUuid, this.components);
    if (curBox && curBox.components[0] && curBox.components[0].getBoxChildConfig) {
      return curBox.components[0].getBoxChildConfig(params);
    }
  }

  public getParams () {
    return this.params;
  }

  public getSceneTree (node) {
    this.tree = {
      label: 'page',
      id: this.uuid,
      children: []
    };

    this.components.forEach(item => {
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


    if (node.components || node.boxs) {
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
      } 
      if(node.boxs) {
        // 容器树
        node.boxs.forEach(node => {
          tree.children.push(this.getTree(node));
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
    if (node.components || node.boxs) {

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
        node.boxs.forEach((item, index) => {
          if (item.uuid === id) {
            index = index;
            node.boxs.splice(index, 1);
            flag = 1; 
          }
          if (flag === 0) {
            this.deleteNode(item, id, flag);
          } 
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
      components: this.components
    }, id);
    this.renderPage();
  }

  public async renderPage () {
    this.params.previewViewStatus = storage.get('preview_view_status');
    this.$('.home').empty();
    this.scriptData = this.VueGenerator.initScript();
    let methods = [];
    this.loopThroughBox(this.components);
    const fn = (boxs, flag = 0) => {
      boxs.map((item, index) => {
        if (flag === 0) {
          const blockListStr = blockList(index, item.getFragment(index).html());
          this.$('.home').append(blockListStr);
        }

        item = item.components && item.components[0] || {};
  
        if (item.insertComponents && item.insertComponents.length) {
          this.VueGenerator.appendComponent(upperCamelCase(item.insertComponents[0]));
        }
  
        if (item.type === 'inline') {
          if (item.components) {
            item.components.forEach(comp => {
              if (comp.vueParse) {
                methods = methods.concat(comp.vueParse.methods || []);
              }
            });
          }
          if (item.components && item.components.length > 0) {
            fn(item.components, 1);
          }
        }
  
        if (item.vueParse) {
          item.vueParse.methods && this.VueGenerator.appendMethods(item.vueParse.methods);
          item.vueParse.data && this.VueGenerator.appendData(item.vueParse.data);
        }
  
      });
    }

    fn(this.components);
    
    if (this.sceneVueParse) {
      this.sceneVueParse.methods && this.VueGenerator.appendMethods(this.sceneVueParse.methods);
      this.sceneVueParse.data && this.VueGenerator.appendData(this.sceneVueParse.data);
      this.VueGenerator.appendMethods(methods);
    }
    this.writeTemplate();
  }

  private writeTemplate () {
    const template = `${this.$.html()}\n<script>${generate(this.scriptData).code}</script>`;
    const formatTemp = prettier.format(template, { semi: true, parser: "vue" });
    fsExtra.writeFile(viewPath, formatTemp, 'utf8');
  }
}