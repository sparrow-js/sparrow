import box from './box';
import {componentConf} from './formConfig';
import {tableConf} from './tableConfig';
import {BasicTableConf} from './BasicTable';
import {BaseFormConf} from './BaseForm';
import RegisterComp from '../../RegisterComp';
import {custom} from './CustomComp';
import * as _ from 'lodash';

const widgetList = [
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
        id: 'Row',
        key: 'Row',
        label: 'colum 1',
        params: {
          columns: 1
        },
        des: '布局容器，1列布局',
        keys: ['布局', '1列', '容器', 'column'],
      },
      {
        id: 'Row',
        key: 'Row',
        label: 'colum 2',
        params: {
          columns: 2
        },
        des: '布局容器，2列布局',
        keys: ['布局', '2列', '容器', 'column'],
      },
      {
        id: 'Row',
        key: 'Row',
        label: 'colum 3',
        params: {
          columns: 3
        },
        des: '布局容器，3列布局',
        keys: ['布局', '3列', '容器', 'column'],
      },
      {
        id: 'Row',
        key: 'Row',
        label: 'colum 4',
        params: {
          columns: 4
        },
        des: '布局容器，4列布局',
        keys: ['布局', '4列', '容器', 'column'],
      },
      {
        id: 'Row',
        key: 'Row',
        label: 'colum 6',
        params: {
          columns: 6
        },
        des: '布局容器，6列布局',
        keys: ['布局', '6列', '容器', 'column'],
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
        },
        des: '主标题, H1',
        keys: ['主标题', 'H1', '文案', '文本'],
      },
      {
        id: 'Typography',
        key: 'Typography',
        label: '标题',
        params: {
          type: 'H2'
        },
        des: '标题, H2',
        keys: ['标题', 'H2', '文案', '文本'],
      },
      {
        id: 'Typography',
        key: 'Typography',
        label: '次标题',
        params: {
          type: 'H3'
        },
        des: '次标题, H3',
        keys: ['次标题', 'H3', '文案', '文本'],
      },
      {
        id: 'Typography',
        key: 'Typography',
        label: '小标题',
        params: {
          type: 'H4'
        },
        des: '小标题, H4',
        keys: ['小标题', 'H4', '文案', '文本'],
      },
      {
        id: 'Typography',
        key: 'Typography',
        label: '正文',
        params: {
          type: 'Text'
        },
        des: '正文, Text',
        keys: ['正文', 'Text', '文案', '文本'],
      },
      {
        id: 'Typography',
        key: 'Typography',
        label: '辅助文字',
        params: {
          type: 'AText'
        },
        des: '辅助文字, AText',
        keys: ['辅助文字', 'AText', '文案', '文本'],
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
        des: '按钮，Button',
        keys: ['按钮', 'Button', '操作'],
      },
      {
        id: 'Link',
        key: 'Link',
        label: 'link',
        des: '按钮，link',
        keys: ['链接', 'link', '操作'],
      },
      // {
      //   id: 'Icon',
      //   key: 'Icon',
      //   label: 'Icon',
      //   des: '图标，Icon',
      //   keys: ['图标', 'Icon', '操作'],
      // },
      {
        id: 'Tag',
        key: 'Tag',
        label: 'Tag',
        des: '标签，Icon',
        keys: ['标签', 'Icon', '操作'],
      }
    ]
  }
];

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

  public getWidgetList (data) {
    const {value} = data;
    const curWidgetList = _.cloneDeep(widgetList);
    if (value) {
      const filterWidgetList = curWidgetList.map(item => {
        const list:any = item.list
        item.list = list.filter(comp => {
          if(comp.label.match(value) || comp.keys.includes(value) || comp.des.match(value)) {
            return true;
          }
          return false;
        })
        return item;
      }).filter(item => {
        return item.list.length > 0
      });
      return filterWidgetList;
    }
    return widgetList;
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