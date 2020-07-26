import * as path from 'path';
import * as fsExtra from 'fs-extra';
import generate from '@babel/generator';
import {blockList} from '../fragment/scene';
import * as cheerio from 'cheerio';
import * as prettier from 'prettier';
import * as upperCamelCase from 'uppercamelcase';
import VueGenerator from '../generator';
import VueParse from '../generator/VueParse';
const uuid = require('@lukeed/uuid');
import Config from '../../config';
import Box from '../box/Box';
import storage from '../../../storage';
import lowdb from '../../../lowdb';
import * as _ from 'lodash'
import Block from '../box/Block';

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
  formatTemp: string = '';
  config: any = {
    dataCode: 'var data = {}'
  };

  constructor (params: any = {}) {
    console.log('************', params);
    this.uuid = uuid().split('-')[0];
    this.VueGenerator = new VueGenerator();
    const {initScene} = params;
    storage.set('preview_view_status', 0);

    this.init();
    if (initScene) {
      const fileStr = fsExtra.readFileSync(path.join(Config.templatePath,'scene', initScene,'index.vue'), 'utf8');
      this.sceneVueParse = new VueParse(uuid().split('-')[0], fileStr);
    }

    if (params.label === 'page') {
      this.jsonToScene(params);
    }

    this.renderPage();
  }

  private jsonToScene (data: any) {
    const fn = (data, obj) => {
      const {children} = data;
      children.forEach(item => {
        if (item.id === 'box') {
          if (obj.addCustomComp) { // 处理特定场景下box追加
            const box = obj.addCustomComp(item);
            const curComp = item.children[0];
            if (curComp) {
              const comp = box.addComponent(curComp);
              if (curComp.children) {
                fn(curComp, comp);
              }
            }
          } else {
            const box = new Box();
            const curComp = item.children[0];
            if (curComp) {
              const comp = box.addComponent(curComp);
              if (curComp.children) {
                fn(curComp, comp);
              }
            }
            obj.components.push(box);
          }
      
        } else {
          const curComp = obj.addComponent(item, 'auto');
          if (item.children && item.children.length) {
            fn(item,  curComp)
          }
        }
  
      });
    }
    fn(data, this)
    setTimeout(() => {
      this.renderPage();
    }, 200)
    
  }

  private async init () {
    const templateStr =  `
      <template>
        <div class="home drag-box" data-id="${this.uuid}">
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
    const leafToRoot = []; 
    const fn = function (boxs) {
      if (Array.isArray(boxs)) {
        boxs.forEach(item => {
          if (item.widgetType === 'box') {
            leafToRoot.unshift(item);
          }
          if (item.components) {
            fn(item.components)
          }
        });
      }
    }
    fn(boxs);
    leafToRoot.forEach(item => {
      item.setPreview && item.setPreview();
    });
  }
  

  public findBoxParent (uuid: string, components: any) {

    let tempComp = null;

    const fn = function (uuid, components) {
      if (tempComp === null) {
        if (Array.isArray(components)) {
          components.forEach(item => {
            if (item.uuid === uuid) {
              tempComp = components;
            }
  
            if (item.components && tempComp === null) {
              fn(uuid, item.components)
            }
          });
        }
      }
    }

    fn(uuid, components);
    return tempComp;
  }

  changePosition (params) {

    const { uuid, order, label} = params;
    if (label === 'page') {
      const components = order.reduce((total, key)=> {
        total.push(this.components.find(comp => comp.uuid === key));
        return total;
      }, []);
      this.components = components;
      this.renderPage();
      return {};
    }
    const currBox = this.findComponent(uuid, this.components);
    if (currBox && currBox.components[0].changePosition) {
      const res = currBox.components[0].changePosition(order);
      this.renderPage();
      return res;
    } else {
      return {
        status: 1,
        message: '暂不支持拖拽'
      }
    }
  }

  public addBox (params: any, ctx) {
    const {boxUuid, id} = params;
    if (boxUuid) {
      const dynamicObj = require(`../box/${id}`).default;
      const currBox = this.findComponent(boxUuid, this.components);
      currBox.components.push(new dynamicObj(params, storage));
    } else {
      const dynamicObj = require(`../box/${id}`).default;
      this.components.push(new dynamicObj(params, storage));
    }

    this.renderPage();
  }

  public addComponent (data, operateType = 'manual') {
    const {boxUuid, id, type, params = {}, nextSiblingId} = data;

    let backComp = null;

    if (!boxUuid || boxUuid === this.uuid) {
      let compIndex = -2;
      if (nextSiblingId) {
        compIndex = this.components.findIndex(item => item.uuid === nextSiblingId);
      }

      const hasBox = fsExtra.pathExistsSync(path.join(__dirname, `../box/${id}`));


      if (hasBox) {
        const dynamicObj = require(`../box/${id}`).default;
        const comp = new dynamicObj(data, storage)
        if (compIndex >= 0) {
          this.components.splice(compIndex, 0, comp)
        } else {
          this.components.push(comp);
        }
        backComp = comp;
      } else {
        const dynamicObj = require(`../component/${id}`).default;
        const comp = new dynamicObj(params, '');
        if (compIndex >= 0) {
          this.components.splice(compIndex, 0, comp)
        } else {
          this.components.push(comp);
        }
        backComp = null;
      }


    } else {
      const currBox = this.findComponent(boxUuid, this.components);
      if (currBox) {
        backComp = currBox.addComponent(data);
      }
    }
    
    if (operateType !== 'auto') {
      this.renderPage();
    }

    return backComp;
  }

  public async addBlock (params, ctx) {
    const {data, boxUuid} = params;
    const { socket } = ctx;
    if (!boxUuid || boxUuid === this.uuid) {
      const block = new Block(storage);
      this.components.push(block);
      await block.addBlock(params);
    } else {
      const currBox = this.findComponent(boxUuid, this.components);
      await currBox.addBlock(params, ctx);
    }
  

    this.renderPage();

   
    socket.emit('generator.scene.block.status', {status: 0, data: {
      status: 2,
      message: 'complete',
    }});
  }

  public insertLabel (params) {

    const {data} = params;
    const currentComp = this.findComponent(data.uuid, this.components);

    if (currentComp) {
      currentComp.insertLabel(data.value);
      this.renderPage();
    }

  }

  public async setting (params: any) {

    const { data, boxUuid} = params;
    const curBox = this.findComponent(boxUuid, this.components);
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

  public settinVueGenerator (params: any) {
    const { data } = params; 
    this.config.dataCode = data.code;
    return {
      status: 0
    }
    this.renderPage();
  }

  public async settingConfig (params: any) {
    const {data} = params;
    const currentComp = this.findComponent(data.uuid, this.components);

    if (currentComp && currentComp.settingConfig) {
      currentComp.settingConfig(data.config);
      this.renderPage();
    }
  }

  private findComponent (uuid, components) {
    let tempComp = null;

    const fn = function (uuid, components, flag = '') {
      if (tempComp === null) {
        if (Array.isArray(components)) {
          components.forEach(item => {
            const curflag = `${flag}.${item.name}`
            if (item.uuid === uuid) {
              tempComp = item;
              tempComp.treePath = curflag;
            }
  
            if (item.components && tempComp === null) {
              fn(uuid, item.components, curflag)
            }
          });
        }
      }
    }

    fn(uuid, components);
    return tempComp;
  }

  public getConfig (params) {
    const { uuid } = params;
    if (uuid) {
      const curBox = this.findComponent(uuid, this.components);
      if (curBox) {
        return curBox.getConfig()
      }
    } else {
      return this.config;
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

  saveScene (data: any) {
    data.id = uuid();
    data.config = this.getSerializeTree();
    lowdb.get('scenes')
    .push(data)
    .write();
  }
  getScene () {
    const scenes = lowdb.get('scenes')
      .value();
      return {
        list: _.clone(scenes).reverse()
      }
  }

  useScene (params) {
    const scene = lowdb.get('scenes')
    .find({ id: params.id }).value()
  }

  getSerializeTree () {
    let tree = {
      label: 'page',
      children: []
    }

    this.components.forEach(item => {
      tree.children.push(this.getSaveTree(item));
    });
    return tree;
  }

  private getSaveTree (node) {
    if (!node) return null;
    const tree:any = {
      id: '',
      config: null,
      children: [],
      params: null,
    };
    if (node.name) {
      tree.id = node.name;
    }

    if (node.fileName) {
      tree.fileName = node.fileName;
    }

    if (node.config) {
      tree.config = node.config;
    }
    if (node.params) {
      tree.params = node.params;
    }

    if (node.components || node.boxs) {
      if (node.components) {
        if (Array.isArray(node.components)) {
          node.components.forEach(node => {
            tree.children.push(this.getSaveTree(node));
          })
        }
      } 
      if(node.boxs) {
        // 容器树
        node.boxs.forEach(node => {
          tree.children.push(this.getSaveTree(node));
        });
      }
      
    } else {
      this.getSaveTree(null);
    }

    return tree;
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

    if (this.config.dataCode) {
      const dataCode = this.VueGenerator.getDataStrAst(this.config.dataCode);
      this.VueGenerator.appendData(dataCode);
    }

    let methods = [];
    let vueData = [];
    this.loopThroughBox(this.components);
    const fn = (boxs, flag = 0) => {
      boxs.map((item, index) => {
        if (flag === 0) {
          const blockListStr = blockList(index, item.getFragment(index).html());
          this.$('.home').append(blockListStr);
        }
        
        if (item.insertComponents && item.insertComponents.length) {
          this.VueGenerator.appendComponent(upperCamelCase(item.insertComponents[0]));
        }
  
        if (item.components) {
          item.components.forEach(comp => {
            if (comp.vueParse) {
              methods = methods.concat(comp.vueParse.methods || []);
              vueData = vueData.concat(comp.vueParse.data || [])
            }
          });
        }
        if (item.components && item.components.length > 0) {
          fn(item.components, 1);
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
    }
    this.VueGenerator.appendMethods(methods);
    this.VueGenerator.appendData(vueData);

    this.writeTemplate();
  }

  private writeTemplate () {
    const template = `${this.$.html()}\n<script>${generate(this.scriptData).code}</script>`;
    const formatTemp = prettier.format(template, { semi: true, parser: "vue" });
    if (formatTemp === this.formatTemp) {
      return;
    }
    this.formatTemp = formatTemp;
    fsExtra.writeFileSync(viewPath, formatTemp, 'utf8');
  }
}