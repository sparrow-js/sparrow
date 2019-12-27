import Scene from '../../adapter-vue'
import Data from '../../adapter-vue/data';

class generator{
  scene: any;
  data: any;
  constructor () {}

  public ready() {
    this.scene = new Scene();
    this.data = new Data();
  }
}

export default (app) => {
  app.beforeStart(async () => {
    app.generator = new generator();
    app.generator.ready();
  });
};