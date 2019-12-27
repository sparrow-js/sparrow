import Box from '../box'

export default class Scene {
  boxs: any;
  blocks: any;
  methods: any;
  mixins: any;

  private blockMap = new Map();

  constructor () {}

  public addBox (id) {
    this.boxs.push(new Box(id));
  }

  public removeBox (index) {
    this.boxs.splice(index, 1);
  }

  public test () {
    return {
      id: '10001',
      message: 'hello world',
    }
  }

  public render () {
    
  }
}