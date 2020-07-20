import * as mkdirp from 'mkdirp';
import * as util from 'util';
import * as fsExtra from 'fs-extra';
import * as path from 'path';
import * as launchEditor from 'launch-code-editor';
import Config from '../../config'
import storage from '../../../storage';
import lowdb from '../../../lowdb';


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
    const { directory, folderName } = data;
    await this.previewView({status: 1});
    const exportPath = path.join(directory, folderName || '')
    mkdirp.sync(exportPath);

    await fsExtra.copy(path.join(Config.viewBasePath, 'src/views'), exportPath);
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

  public async deleteScene (params) {
    lowdb.get('scenes')
    .remove({ id: params.id })
    .write();
  }

  public resetScene (scene: any) {
    this.scene = scene;
  }
}