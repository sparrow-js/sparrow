
import BoxFragment from '../fragment/box';
import LayoutBox from './layout';

export default class Box {
  public createBox (id: number) {
    let curBox: any;
    switch (id) {
      case 10003:
        curBox = new LayoutBox();
        break;
      default:
        break;
    }
  }
}