import Config from '../../config'
import lowdb from '../../../lowdb';


export default class Toolbar {
  scene: any;

  constructor (scene: any) {
    this.scene = scene;
  }

  public async previewView (data: any) {
    lowdb.set('preview_view_status', +data.status).write();
    await this.scene.renderPage();
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