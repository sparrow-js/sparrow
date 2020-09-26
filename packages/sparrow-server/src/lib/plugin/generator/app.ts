import Scene from '../../adapter-vue'
import Data from '../../adapter-vue/data';
import Toolbar from '../../adapter-vue/modules/toolbar';
import * as rimraf from 'rimraf';
import * as util from 'util';
import Config from '../../adapter-vue/config';
import SceneData from '../../adapter-vue/data/SceneData'
import lowdb from '../../lowdb';
import Api from '../../adapter-vue/modules/api';
const uuid = require('@lukeed/uuid');


const rimrafAsync = util.promisify(rimraf);

class generator{
  scene: any;
  data: any;
  toolbar: any;
  api: any;

  constructor () {
    this.data = new Data();
  }

  public ready() {

    this.scene = new Scene();
    this.api = new Api(this.scene);
    this.toolbar = new Toolbar(this.scene);
    this.toolbar.trash = this.trash.bind(this);
    this.toolbar.initScene = this.initScene.bind(this);
    this.toolbar.useScene = this.useScene.bind(this);
  }

  public async trash () {
    this.scene = new Scene();
    this.toolbar.resetScene(this.scene)
    await rimrafAsync(Config.componentsDir);
    return {
      status: 0
    };
  }

  public async initScene (scene: any) {
    const params = SceneData[scene.name] || null;
    await this.trash();
    this.scene = new Scene(params.config);
    this.toolbar.resetScene(this.scene);
    this.api.resetScene(this.scene);
  }

  public async useScene (params: any) {
    const scene = lowdb.get('scenes')
    .find({ id: params.id }).value()
    await this.trash()
    this.scene = new Scene(scene.config);
    this.toolbar.resetScene(this.scene);
    this.api.resetScene(this.scene);
  }
}

export default (app) => {
  app.beforeStart(async () => {
    app.generator = new generator();
    app.generator.ready();
  });
};