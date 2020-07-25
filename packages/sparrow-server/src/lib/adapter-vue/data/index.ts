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
        label: '布局',
        type: 'box',
        list: [
          {
            id: 'layout',
            key: 'layout',
            label: 'colum 1',
          },
          {
            id: 'layout',
            key: 'layout',
            label: 'colum 2',
          },
          {
            id: 'layout',
            key: 'layout',
            label: 'colum 3',
          },
          {
            id: 'layout',
            key: 'layout',
            label: 'colum 4',
          },
          {
            id: 'layout',
            key: 'layout',
            label: 'colum 6',
          }
        ]
      },
      {
        label: '表单',
        type: 'component',
        list: componentConf,
      },
      {
        label: '文本',
        type: 'component',
        list: [
          {
            id: 'HText',
            key: 'HText',
            label: 'H1',
            params: {
              type: 'H1'
            }
          },
          {
            id: 'HText',
            key: 'HText',
            label: 'H2',
            params: {
              type: 'H2'
            }
          },
          {
            id: 'HText',
            key: 'HText',
            label: 'H3',
            params: {
              type: 'H3'
            }
          }
        ]
      },
      {
        label: '按钮',
        type: 'component',
        list: [
          {
            id: 'Button',
            key: 'Button',
            label: 'Button',
            params: {
              type: 'Button'
            }
          },
          {
            id: 'Button',
            key: 'Button',
            label: 'link',
            params: {
              type: 'link'
            }
          }
        ]
      }
      // {
      //   label: '表格',
      //   type: 'component',
      //   list: tableConf
      // },
    ]
  }
}