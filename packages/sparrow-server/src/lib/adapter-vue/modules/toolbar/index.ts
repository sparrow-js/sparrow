import * as mkdirp from 'mkdirp';
import * as util from 'util';
import * as fsExtra from 'fs-extra';
import * as path from 'path';
import * as launchEditor from 'launch-code-editor';
import Config from '../../config'
import storage from '../../../storage';

const mkdirpAsync = util.promisify(mkdirp);

export default class Toolbar {
  scene: any;

  constructor (scene: any) {
    this.scene = scene;
  }

  public async previewView (data: any) {
    storage.set('preview_view_status', +data.status);
    await this.scene.renderPage();
  }

  public async exportFile (data: any) {
    const { directory } = data;
    await this.previewView({status: 1});
    await mkdirpAsync(directory);
    await fsExtra.copy(path.join(Config.viewBasePath, 'src/views'), directory);
    return {
      status: 0
    };
  }

  public openCodeEditor (data: any, ctx: any) {
    const { socket } = ctx;
    launchEditor(Config.viewBasePath, 'code', (fileName, errorMsg) => {
      socket.emit('generator.toolbar.openCodeEditor.result', errorMsg);
  });
  }

  public resetScene (scene: any) {
    this.scene = scene;
  }
}