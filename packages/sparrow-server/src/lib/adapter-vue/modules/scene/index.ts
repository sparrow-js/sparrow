
export default class Scene {
  public boxs: any;
  public blocks: any;
  public methods: any;
  public mixins: any;

  private blockMap = new Map();

  constructor () {}

  public addBox (id) {
    this.boxs.push(id);
  }

  public removeBox (index) {
    this.boxs.splice(index, 1);
  }

  public render () {
    
  }
}