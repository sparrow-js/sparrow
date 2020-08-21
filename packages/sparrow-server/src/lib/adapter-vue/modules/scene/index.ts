import * as Path from 'path';
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
import storage from '../../../storage';
import lowdb from '../../../lowdb';
import * as _ from 'lodash'
import Block from '../box/Block';

const cwd = process.cwd();
const viewPath = Path.join(cwd, '..', 'sparrow-view/src/views/index.vue')

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
  tempCopyStore: any = {};
  renderPageToggle = false;
  style: string = '';
  storeStyleRepeat = [];

  constructor (params: any = {}) {
    this.uuid = uuid().split('-')[0];
    this.VueGenerator = new VueGenerator();
    const {initScene} = params;
    storage.set('preview_view_status', 0);
    this.renderPage = _.throttle(this.renderPage, 500)
    this.init();
    if (initScene) {
      const fileStr = fsExtra.readFileSync(Path.join(Config.templatePath,'scene', initScene,'index.vue'), 'utf8');
      this.sceneVueParse = new VueParse(uuid().split('-')[0], fileStr);
    }

    if (params.label === 'page') {
      this.jsonToScene(params, this);
    } else {
      this.renderPage();
    }
  }

  private jsonToScene (data: any, obj) {
    const fn = (data, obj) => {
      const {children} = data;
      children.forEach(item => {
    
        const curComp = obj && obj.addComponent(item, 'auto');
        if (item.children && item.children.length) {
          fn(item,  curComp)
        }
  
      });
    }
    fn(data, obj)
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

  public addComponent (data, operateType = 'manual') {
    const {boxUuid, id, params = {}, config, nextSiblingId, path} = data;

    let backComp = null;

    if (!boxUuid || boxUuid === this.uuid) {
      let compIndex = -2;
      if (nextSiblingId) {
        compIndex = this.components.findIndex(item => item.uuid === nextSiblingId);
      }

      const hasBox = fsExtra.pathExistsSync(Path.join(__dirname, `../box/${id}`));

      if (config) {
        config.initType = operateType;
      }

      if (path) {
        const dynamicObj = require(`..${path}`).default;
        const comp = new dynamicObj(params, storage);
        comp.path = path;
        if (compIndex >= 0) {
          this.components.splice(compIndex, 0, comp)
        } else {
          this.components.push(comp);
        }
        backComp = comp;

      } else if (hasBox) {
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
        const comp = new dynamicObj(config || params, '');
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

  public setVueGenerator (params: any) {
    const { data } = params; 
    this.config.dataCode = data.code;
    this.renderPage();
    return {
      status: 0
    }
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

  public copyHandler (data) {
    const { activeCompId } = data;
    const curBox = this.findComponent(activeCompId, this.components);
    this.tempCopyStore = this.getSaveTree(curBox);
  }

  public pasteHandler (data) {
    const {compId} = data;
    const curBox = this.findComponent(compId, this.components);
    this.jsonToScene({children: [_.cloneDeep(this.tempCopyStore)]}, curBox)
  }

  public addEditComp(data) {
    const {path} = data;
    const curBox = this;
    const box = require(`..${path}/init`).default;
    this.jsonToScene({children: [box]}, curBox)
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
      path: '',
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

    if (node.path) {
      tree.path = node.path;
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
  
  public deleteComponent (params: {id: string}, renderPage = true) {
    const {id} = params;
    this.deleteNode({
      uuid: 'page',
      components: this.components
    }, id);
    if (renderPage) {
      this.renderPage();
    }
  }

  public insertEditText (params: any) {
    const { uuid } = params;
    const comp = this.findComponent(uuid, this.components);
    comp && comp.insertEditText(params);
    this.renderPage();
  }

  public dragViewWidgetHandler (params: any, ctx) {
    const { socket } = ctx;
    const {
      compId,
      boxId,
      nextSiblingId,
    } = params;
    const curComp = this.findComponent(compId, this.components);
    if (!curComp) return;
    const compJson = this.getSaveTree(curComp);
    compJson.nextSiblingId = nextSiblingId;
    let curBox = this.findComponent(boxId, this.components);
    if (boxId === this.uuid) {
      curBox = this;
    }
    this.deleteComponent({
      id: compId
    }, false);
    this.renderPageToggle = !this.renderPageToggle; // 强制webpack热更新
    this.jsonToScene({children: [compJson]}, curBox);
    // socket.emit('generator.force.refresh');
  }

  public async renderPage () {

    this.params.previewViewStatus = storage.get('preview_view_status');
    this.$('.home').empty();
    this.style = '';
    this.storeStyleRepeat = [];
    if (this.renderPageToggle) {
      this.$('.home').append('<div class="toggle"/>')
    }


    this.scriptData = this.VueGenerator.initScript();

    if (this.config.dataCode) {
      const dataCode = this.VueGenerator.getDataStrAst(this.config.dataCode);
      this.VueGenerator.appendData(dataCode);
    }

    let methods = [];
    let vueData = [];
    let importDeclarations = [];
    let vueComponents = [];
    this.loopThroughBox(this.components);
    const fn = (boxs, flag = 0) => {
      boxs.forEach((item, index) => {
        if (flag === 0) {
          const blockListStr = blockList(index, item.getFragment(index).html());
          this.$('.home').append(blockListStr);
        }
        
        if (item.insertComponents && item.insertComponents.length) {
          this.VueGenerator.appendComponent(upperCamelCase(item.insertComponents[0]));
        }
        if (item.name === 'File') {
          item.renderPage();
          return;
        }
  
        if (item.components) {
          item.components.forEach(comp => {
            if (comp.vueParse) {

              if (!this.hasStyle(comp.name)) {
                this.style += comp.vueParse.style;
                this.storeStyleRepeat.push(comp.name)
              }
              
              methods = methods.concat(comp.vueParse.methods || []);
              vueData = vueData.concat(comp.vueParse.data || [])
              importDeclarations = importDeclarations.concat(comp.vueParse.importDeclarations || [])
              vueComponents= vueComponents.concat(comp.vueParse.components || []);
            }
          });
        }
        if (item.components && item.components.length > 0) {
          fn(item.components, 1);
        }
  
        if (item.vueParse) {
          if (!this.hasStyle(item.name)) {
            this.style += item.vueParse.style;
            this.storeStyleRepeat.push(item.name)
          }
          item.vueParse.methods && this.VueGenerator.appendMethods(item.vueParse.methods);
          item.vueParse.data && this.VueGenerator.appendData(item.vueParse.data);
          item.vueParse.importDeclarations && this.VueGenerator.appendImport(item.vueParse.importDeclarations);
          this.VueGenerator.appendAutoComponents(item.vueParse.components);
        }
  
      });
    }

    fn(this.components);
    
    if (this.sceneVueParse) {
      this.style += this.sceneVueParse.style;
      this.sceneVueParse.methods && this.VueGenerator.appendMethods(this.sceneVueParse.methods);
      this.sceneVueParse.data && this.VueGenerator.appendData(this.sceneVueParse.data);
      this.sceneVueParse.importDeclarations && this.VueGenerator.appendImport(this.sceneVueParse.importDeclarations);
      this.VueGenerator.appendAutoComponents(this.sceneVueParse.components);
    }
    this.VueGenerator.appendMethods(methods);
    this.VueGenerator.appendData(vueData);
    this.VueGenerator.appendImport(importDeclarations);
    this.VueGenerator.appendAutoComponents(vueComponents);
    this.writeTemplate();
  }

  private hasStyle (name: string) {
    if (this.storeStyleRepeat.includes(name)) {
      return true;
    }
    return false;
  }

  private writeTemplate () {
    const template = `${this.$.html()}\n<script>${generate(this.scriptData).code}</script> <style lang="scss" scoped>${this.style || ''}</style>`;
    const formatTemp = prettier.format(template, { semi: true, parser: "vue" });
    if (formatTemp === this.formatTemp) {
      return;
    }
    this.formatTemp = formatTemp;
    fsExtra.writeFileSync(viewPath, formatTemp, 'utf8');
  }
}