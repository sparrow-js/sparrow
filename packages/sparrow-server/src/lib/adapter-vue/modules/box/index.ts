
import LayoutBox from './layout';

export default class Box {
  public createBox (data: any) {
    let curBox: any;
    const {id} = data;
    switch (id) {
      case 10003:
        curBox = new LayoutBox(data);
        break;
      default:
        break;
    }
    return curBox;
  }
}