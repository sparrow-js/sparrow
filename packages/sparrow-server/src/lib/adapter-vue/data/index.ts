import box from './box';
import component from './component';
import {componentConf} from './formConfig';

export default class Data {
  
  public getBoxList () {
    return box;
  }

  public getComponentList () {
    return component;
  }

  public getFormList () {
    return componentConf;
  }
}