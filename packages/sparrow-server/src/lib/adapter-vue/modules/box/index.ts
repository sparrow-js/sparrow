export default class Box {
  public blocks;
  public components;
  public methods;
  
  constructor () {}

  public addComponent (component) {
    this.components.push(component);
  }

  public removeComponent (index) {
    this.components.splice(index, 1);
  }
  
}