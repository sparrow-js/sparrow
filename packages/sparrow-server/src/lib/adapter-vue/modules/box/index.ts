
// import LayoutBox from './layout';
import Block from './block';
import Form from './Form';
import Table from './Table';
import Inline from './Inline';
import CustomInline from './CustomInline';
import PageHeader from './PageHeader'
export default class Box {
  public createBox (data: any) {
    let curBox: any;
    const {id} = data;
    switch (id) {
      case 'block':
        curBox = new Block(data);
        break;
      // case 'layout':
      //   curBox = new LayoutBox(data);
      //   break;
      case 'form':
        curBox = new Form(data);
        break;
      case 'table':
          curBox = new Table(data);
        break;
      case 'inline':
          curBox = new Inline(data);
        break;
      case 'customInline':
          curBox = new CustomInline(data);
        break;
      case 'pageHeader': 
        curBox = new PageHeader(data);
        break;
      default:
        break;
    }
    return curBox;
  }
}