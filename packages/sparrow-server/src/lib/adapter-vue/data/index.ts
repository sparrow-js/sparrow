import box from './box';
import {componentConf} from './formConfig';
import {tableConf} from './tableConfig';
import {BasicTableConf} from './BasicTable';
import {BaseFormConf} from './BaseForm';
import RegisterComp from '../../RegisterComp';
export default class Data {
  
  public getBoxList () {
    return box;
  }

  public getCompList () {
    RegisterComp.getCompByAscriptionData('BaseForm');

    return {
      form: componentConf,
      table: tableConf,
      BasicTable: BasicTableConf,
      BaseForm: BaseFormConf,
      Container: {
        list: box
      }
    };
  }

  public getWidgetList () {
    return [
      {
        label: '容器',
        type: 'box',
        list: box,
      },
      {
        label: '表单',
        type: 'component',
        list: componentConf,
      },
      {
        label: '表格',
        type: 'component',
        list: tableConf
      },
    ]
  }
}