
import LayoutBox from './layout';
import Block from './block';
import Form from './form';
import Table from './table';

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
        break;
      case 'table':
          curBox = new Table(data);
      default:
        break;
    }
    return curBox;
  }
}