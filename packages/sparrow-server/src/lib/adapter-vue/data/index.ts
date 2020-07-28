import box from './box';
import {componentConf} from './formConfig';
import {tableConf} from './tableConfig';
import {BasicTableConf} from './BasicTable';
import {BaseFormConf} from './BaseForm';
import RegisterComp from '../../RegisterComp';
import {custom} from './CustomComp';

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
            params: {
              columns: 1
            }
          },
          {
            id: 'layout',
            key: 'layout',
            label: 'colum 2',
            params: {
              columns: 2
            }
          },
          {
            id: 'layout',
            key: 'layout',
            label: 'colum 3',
            params: {
              columns: 3
            }
          },
          {
            id: 'layout',
            key: 'layout',
            label: 'colum 4',
            params: {
              columns: 4
            }
          },
          {
            id: 'layout',
            key: 'layout',
            label: 'colum 6',
            params: {
              columns: 6
            }
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
            id: 'Typography',
            key: 'Typography',
            label: '主标题',
            params: {
              type: 'H1'
            }
          },
          {
            id: 'Typography',
            key: 'Typography',
            label: '标题',
            params: {
              type: 'H2'
            }
          },
          {
            id: 'Typography',
            key: 'Typography',
            label: '次标题',
            params: {
              type: 'H3'
            }
          },
          {
            id: 'Typography',
            key: 'Typography',
            label: '小标题',
            params: {
              type: 'H4'
            }
          },
          {
            id: 'Typography',
            key: 'Typography',
            label: '正文',
            params: {
              type: 'Text'
            }
          },
          {
            id: 'Typography',
            key: 'Typography',
            label: '辅助文字',
            params: {
              type: 'AText'
            }
          }
        ]
      },
      {
        label: '操作',
        type: 'component',
        list: [
          {
            id: 'Button',
            key: 'Button',
            label: 'Button',
          },
          {
            id: 'Link',
            key: 'Link',
            label: 'link',
          },
          {
            id: 'Icon',
            key: 'Icon',
            label: 'Icon',
          },
          {
            id: 'Tag',
            key: 'Tag',
            label: 'Tag',
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

  public getEditBlockList () {
    return [
      {
        label: '页头',
        type: 'editBox',
        list: [
          {
            id: 'PageHeader',
            key: 'PageHeader',
            label: '页头',
            icon: ''
          },
        ]
      },
    ]
  }


  public getCustomComp (params: any) {
    const {value} = params;
    if (value === '') return [];
    const list = custom.filter(item => {
      if(item.label.match(value) || item.keys.includes(value) || item.des.match(value)) {
        return true;
      }
      return false;
    });
    return list;
  }
  
}