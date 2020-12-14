import generate from '@babel/generator';
import {blockList} from '../fragment/scene';
import * as cheerio from 'cheerio';
import prettier from "prettier/standalone";
import parserHtml from 'prettier/parser-html';
import parserBabel from 'prettier/parser-babel';
import upperCamelCase from 'uppercamelcase';
import VueGenerator from '../generator';
import VueParse from '../generator/VueParse';
import { v4 as uuid } from '@lukeed/uuid';
import Config from '../../config';
import lowdb from '../../../lowdb';
import * as _ from 'lodash'
import ApiComp from '../api';
import LifeCycle from '../LifeCycle';
import Message from '../../../../utils/message';
const cwd = process.cwd();
const viewPath = '/src/views/';

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
  style: string = '';
  storeStyleRepeat = [];
  forceRender: boolean = true;

  timeCache: any = [];
  timeCursor: number = 0;
  isTime: boolean = false;

  constructor (params: any = {}) {
    this.uuid = uuid().split('-')[0];
    this.VueGenerator = new VueGenerator();
    const {initScene} = params;
    lowdb.set('preview_view_status', 0).write();
    this.renderPage = _.throttle(this.renderPage, 500)
    this.init();

    if (params.label === 'page') {
      this.config = params.config;
      this.jsonToScene(params, this);
    } else {
      this.initApi();
      this.initLifeCycle();
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
    this.renderPage();
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

    // 初始化生命周期
  }

  private async initLifeCycle() {
    this.components.push(new LifeCycle());
  }

  async getLifeCycle({uuid}) {
    const comp = this.findComponent(uuid, this.components) || this;
    const lifeCycle = comp.components.find(item => item.name === 'lifeCycle');
    return {
      code: lifeCycle.getCode(),
      status: 0
    } 
  }

  async saveLifeCycle (data) {
    const {uuid, code} = data;
    const comp = this.findComponent(uuid, this.components) || this;
    const lifeCycle = comp.components.find(item => item.name === 'lifeCycle');
    lifeCycle.setCode(code);
    this.renderPage();
  }

  loopThroughBox (boxs: any,) {
    const leafToRoot = []; 
    const fn = function (boxs) {
      if (Array.isArray(boxs)) {
        boxs.forEach(item => {
          if (item.widgetType === 'box' || item.isBox) {
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
    let {boxUuid, id, params = {}, config, nextSiblingId, path, type} = data;

    let backComp = null;
    if (!boxUuid || boxUuid === this.uuid) {
      let compIndex = -2;
      if (nextSiblingId) {
        compIndex = this.components.findIndex(item => item.uuid === nextSiblingId);
      }


      if (config) {
        config.initType = operateType;
      }


      let isPlugins = false;
      if (id.includes('sparrow')) {
        isPlugins = true;
      }

      if (isPlugins) {
        const dynamicObj = require(path);
        const comp = new dynamicObj(data, lowdb, {projectPaths: Config});
        if (compIndex >= 0) {
          this.components.splice(compIndex, 0, comp)
        } else {
          this.components.push(comp);
        }
        backComp = comp;
      }
      //  else if (path) {
      //   const dynamicObj = require(`../${path}`);
      //   const comp = new dynamicObj(data, {});
      //   comp.path = path;
      //   if (compIndex >= 0) {
      //     this.components.splice(compIndex, 0, comp)
      //   } else {
      //     this.components.push(comp);
      //   }
      //   backComp = comp;
      // } 
      else if (type === 'custom') {
        const tempPath = path.split('custom/')[1];
        const dynamicObj = require(`../custom/${tempPath}`);
        const comp = new dynamicObj(data, lowdb);
        comp.path = path;
        if (compIndex >= 0) {
          this.components.splice(compIndex, 0, comp)
        } else {
          this.components.push(comp);
        }
        backComp = comp;
      } else if (type === 'EditBlock') {
        const tempPath = path.split('EditBlock/')[1];
        const dynamicObj = require(`../EditBlock/${tempPath}`);
        const comp = new dynamicObj(data, lowdb);
        comp.path = path;
        if (compIndex >= 0) {
          this.components.splice(compIndex, 0, comp)
        } else {
          this.components.push(comp);
        }
        backComp = comp;
      } else if (type === 'box') {
        const dynamicObj = require(`../box/${id}`);
        const comp = new dynamicObj(data, lowdb, {projectPaths: Config})
        if (compIndex >= 0) {
          this.components.splice(compIndex, 0, comp)
        } else {
          this.components.push(comp);
        }
        backComp = comp;
      } else {
        // api 生命周期临时生成
        if (path === 'api' || path === 'LifeCycle') {
          const dynamicObj = require(`../../modules/${path}`);
          const comp = new dynamicObj(config || params, '');
          if (compIndex >= 0) {
            this.components.splice(compIndex, 0, comp)
          } else {
            this.components.push(comp);
          }
        } else {
          const dynamicObj = require(`../component/${id}`);
          const comp = new dynamicObj(config || params, '');
          if (compIndex >= 0) {
            this.components.splice(compIndex, 0, comp)
          } else {
            this.components.push(comp);
          }
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
      return this.renderPage();
    }

    return backComp;
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
    let {path} = data;
    const curBox = this;
    path = path.split('EditBlock')[1];
    const box = require(`../EditBlock${path}/init`);
    this.jsonToScene({children: Array.isArray(box) ? box : [box]}, curBox)
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

  getFileList () {
    const fileList = [{
      fileName: 'home',
      uuid: this.uuid
    }]
    const fn = (components) => {
      components.forEach(item => {
        if (item.name === 'File') {
          fileList.push({
            uuid: item.uuid,
            fileName: item.fileName
          })
        }
        if (item.components) {
          fn(item.components)
        }
      });
    }

    fn(this.components);
    
    return {
      list: fileList
    };
  }

  useScene (params) {
    const scene = lowdb.get('scenes')
    .find({ id: params.id }).value()
  }

  getSerializeTree () {
    let tree = {
      label: 'page',
      config: this.config,
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
      type: '',
    };
    if (node.name) {
      tree.id = node.name;
    }

    if (node.fileName) {
      tree.fileName = node.fileName;
    }

    if (node.widgetType) {
      tree.type = node.widgetType;
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
    // this.renderPage(); 插入文本只同步数据，不刷新数据
  }

  public refresh () {
    this.renderPage();
  }

  public dragViewWidgetHandler (params: any) {
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
    this.jsonToScene({children: [compJson]}, curBox);
  }

  public async prevScene() {
    this.isTime = true;
    if (this.timeCursor <= 0) return;
    const tree = this.timeCache[--this.timeCursor];
    if (!tree) return;
    this.components = [];
    this.jsonToScene(tree, this);
  }

  public async nextScene() {
    this.isTime = true;
    const tree = this.timeCache[++this.timeCursor];
    if (!tree)  {
      this.timeCursor = this.timeCache.length - 1;
      return;
    }
    this.components = [];
    this.jsonToScene(tree, this);
  }

  public storageScene () {
    if (this.timeCursor < this.timeCache.length - 1) {
      this.timeCache.splice(this.timeCursor, 100);
    }
    const tree = this.getSerializeTree();
    this.timeCache.push(tree);
    this.timeCursor = this.timeCache.length - 1;
  }

   public async getOriginalCode ({uuid}) {
     // uuid

    const comp = this.findComponent(uuid, this.components) || this;
    const previewViewStatus = lowdb.get('preview_view_status').value();
    lowdb.set('preview_view_status', true).write();
    const code = await comp.renderPage(false);
    lowdb.set('preview_view_status', previewViewStatus).write();
    return {
      code
    }
  }

  public initApi () {
    const apiComp = new ApiComp();
    this.components.push(apiComp);
  }

  public handlerApi(params) {
    const {uuid, data} = params;
    const apiCompBox = this.findComponent(uuid, this.components) || this;
    const apiComp = apiCompBox.components.find(item => item.name === 'api');
    return apiComp.handlerApi(data);
  }

  public handlerLifeCycle(params) {
    const {uuid, data} = params;
    const apiCompBox = this.findComponent(uuid, this.components) || this;
    const apiComp = apiCompBox.components.find(item => item.name === 'lifeCycle');
    return apiComp.handlerLifeCycle(data);
  }



  public renderApiFile(list: any) {
    const apiList = list.reduce((origin,item) => {
      const apiComp = item.components.find(comp => comp.name === 'api');
      return origin.concat(apiComp.config.list);
    }, []);

    let apiTemp = `import request from '@/utils/request'`;
    apiList.forEach(item => {
      if (item.methodType === 'get') {
        apiTemp += `
          export function ${item.methodName}(params) {
            return request({
              url: '${item.url}',
              method: '${item.methodType}',
              params
            })
          }
        `;

      } else if (item.methodType === 'post') {
        apiTemp += `
          export function ${item.methodName}(data) {
            return request({
              url: '${item.url}',
              method: '${item.methodType}',
              data
            })
          }
        `;
      }

      const formatTemp = prettier.format(apiTemp, { semi: true, parser: "babel" });
    });

  }


  public async renderPage (outputToFile: boolean = true) {
    this.params.previewViewStatus = lowdb.get('preview_view_status').value();
    this.$('.home').empty();
    this.style = '';
    this.storeStyleRepeat = [];

    this.scriptData = this.VueGenerator.initScript();

    if (this.config.dataCode) {
      const dataCode = this.VueGenerator.getDataStrAst(this.config.dataCode);
      this.VueGenerator.appendData(dataCode);
    }

    let methods = [];
    let vueData = [];
    let importDeclarations = [];
    let vueComponents = [];
    let fileList = [this];
    this.loopThroughBox(this.components);
    const fn = (boxs, flag = 0) => {
      boxs.forEach((item, index) => {

        if (flag === 0 && item.getFragment) {
          const blockListStr = blockList(index, item.getFragment(index).html());
          this.$('.home').append(blockListStr);
        }
        
        if (item.insertComponents && item.insertComponents.length) {
          this.VueGenerator.appendComponent(upperCamelCase(item.insertComponents[0]));
        }
        if (item.name === 'File') {
          fileList.push(item);
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
          item.vueParse.created && this.VueGenerator.appendCreated(item.vueParse.created);
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
    this.renderApiFile(fileList);
    if (!this.$('.home').html()) {
      this.$('.home').css({
        backgroundImage: 'url(https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dded9db02e3f4052bbf451f04d3d9b5b~tplv-k3u1fbpfcp-zoom-1.image)'
      })
    } else {
      this.$('.home').css({
        backgroundImage: ''
      })
    }
    this.$('.home').append(this.forceRender ?  '<div />' : '');
    this.forceRender = !this.forceRender
    if (outputToFile) {
      return this.writeTemplate();
    } else {
      return this.getCode();
    }

  }

  private hasStyle (name: string) {
    if (this.storeStyleRepeat.includes(name)) {
      return true;
    }
    return false;
  }

  private getCode () {
    const template = `${this.$.html()}\n<script>${generate(this.scriptData).code}</script> <style lang="scss" scoped>${this.style || ''}</style>`;
    const formatTemp = prettier.format(template, { semi: true, parser: "vue" });
    return formatTemp;
  }

  private writeTemplate () {
    const template = `${this.$.html()}\n<script>${generate(this.scriptData).code}</script> <style lang="scss" scoped>${this.style || '.placeholder-demo{color: #fff;}'}</style>`;
    const formatTemp = prettier.format(template, { semi: true, parser:"vue", plugins: [parserHtml, parserBabel]});
    if (formatTemp === this.formatTemp) {
      return;
    }
    this.formatTemp = formatTemp;
    if (this.isTime === false) {
      this.storageScene();
    }
    this.isTime = false;
    Message.emit('generate-file', {
      code: formatTemp,
      path: '/src/views/index.vue',
    });
    return formatTemp;
  }
}