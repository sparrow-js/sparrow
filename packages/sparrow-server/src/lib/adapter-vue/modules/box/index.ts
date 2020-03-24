
import LayoutBox from './layout';
import Block from './block';
import Form from './form';
import Table from './table';
import Inline from './Inline';

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
        break;
      case 'inline':
          curBox = new Inline(data);
        break;  
      default:
        break;
    }
    return curBox;
  }
}