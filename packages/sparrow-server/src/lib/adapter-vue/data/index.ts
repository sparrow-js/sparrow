import box from './box';
import {componentConf} from './formConfig';
import {tableConf} from './tableConfig';

export default class Data {
  
  public getBoxList () {
    return box;
  }

  public getCompList () {
    return {
      form: componentConf,
      table: tableConf,
    };
  }
}