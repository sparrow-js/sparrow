import Scene from '../../adapter-vue'
import Data from '../../adapter-vue/data';
import Toolbar from '../../adapter-vue/modules/toolbar';
import * as rimraf from 'rimraf';
import * as util from 'util';
import Config from '../../adapter-vue/config';

const rimrafAsync = util.promisify(rimraf);

class generator{
  scene: any;
  data: any;
  toolbar: any;
  
  constructor () {
    this.data = new Data();
  }

  public ready() {

    this.scene = new Scene();
    this.toolbar = new Toolbar(this.scene);
    this.toolbar.trash = this.trash.bind(this);
    this.toolbar.initScene = this.initScene.bind(this);
  }

  public async trash () {
    this.scene = new Scene();
    this.toolbar.resetScene(this.scene)
    await rimrafAsync(Config.componentsDir);
    return {
      status: 0
    };
  }

  public async initScene (scene: string) {
    const params = {
      name: 'BaseTable',
      boxs: [
        {
          data: {
            id: 'form',
            key: 'form',
            boxIndex: 0,
            params: { isForm: false, row: '', col: '', blockName: 'Form1' }
          },
        },
        {
          data: {
            id: 'customInline',
            key: 'customInline',
            boxIndex: 1,
          }
        },
        {
          data: {
            id: 'table',
            key: 'table',
            boxIndex: 2,
            params: { isForm: false, row: '', col: '4', blockName: 'Table1' }
          }
        },
        {
          data: {
            id: 'inline',
            key: 'inline',
            boxIndex: 3,
            innerHtml: `<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />`
          }
        },
      ]
    }
    await this.trash()
    this.scene = new Scene(params);
    this.toolbar.resetScene(this.scene);
  }
}

export default (app) => {
  app.beforeStart(async () => {
    app.generator = new generator();
    app.generator.ready();
  });
};