import Scene from '../scene';

export default class Toolbar {
  scene: any;

  constructor (scene: any) {
    this.scene = scene;
  }

  public previewView (data: any) {
    this.scene.renderPage(+data.status);
  }

  public exportFile (data: any) {
    console.log(data);
  }

  public resetScene (scene: any) {
    this.scene = scene;
  }
  
}