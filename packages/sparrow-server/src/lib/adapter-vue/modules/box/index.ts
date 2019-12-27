
import parse5 from 'parse5';
import BoxFragment from '../fragment/box';

export default class Box {
  blocks: any;
  components: any;
  fragment: any;
  id: number;
  
  constructor (id:number , config?: any) {
    this.id = id;
    this.fragment = parse5.parse(BoxFragment.layout);
  }

  public addComponent (component) {
    this.components.push(component);
  }

  public removeComponent (index) {
    this.components.splice(index, 1);
  }

  public getFragment () {
    return this.fragment;
  }
}