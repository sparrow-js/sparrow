
import LayoutBox from './layout';
import Block from './block';
import Form from './form';

export default class Box {
  public createBox (data: any) {
    let curBox: any;
    const {id} = data;
    switch (id) {
      case 'block':
        curBox = new Block(data);
        break;
      case 'layout':
        curBox = new LayoutBox(data);
        break;
      case 'form':
        curBox = new Form(data);
      default:
        break;
    }
    return curBox;
  }
}