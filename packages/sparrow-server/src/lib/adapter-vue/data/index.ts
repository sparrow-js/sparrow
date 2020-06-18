import box from './box';
import {componentConf} from './formConfig';
import {tableConf} from './tableConfig';
import {BasicTableConf} from './BasicTable';
import {BaseFormConf} from './BaseForm';

export default class Data {
  
  public getBoxList () {
    return box;
  }

  public getCompList () {
    return {
      form: componentConf,
      table: tableConf,
      BasicTable: BasicTableConf,
      BaseForm: BaseFormConf,
      Container: box
    };
  }
}