import Scene from '../adapter-vue'
import Data from '../adapter-vue/data';
import Toolbar from '../adapter-vue/modules/toolbar';
// import * as util from 'util';
// import Config from '../adapter-vue/config';
import lowdb from '../lowdb';
// const uuid = require('@lukeed/uuid');

class generator{
  scene: any;
  data: any;
  toolbar: any;
  api: any;

  constructor () {
    this.data = new Data();
    this.scene = new Scene();
    this.toolbar = new Toolbar(this.scene);
    this.toolbar.trash = this.trash.bind(this);
    this.toolbar.useScene = this.useScene.bind(this);
  }

  public async trash () {
    this.scene = new Scene();
    this.toolbar.resetScene(this.scene)
    return {
      status: 0
    };
  }

  public async useScene (params: any) {
    const scene = lowdb.get('scenes')
    .find({ id: params.id }).value()
    await this.trash()
    this.scene = new Scene(scene.config);
    this.toolbar.resetScene(this.scene);
  }
}

export default new generator();