import box from './box';
import {componentConf} from './formConfig';
import {tableConf} from './tableConfig';
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
    label: '布局容器',
    type: 'box', // ElContainer
    list: [
      {
        id: 'ElContainer',
        key: 'ElContainer',
        label: 'Container',
        des: '布局容器',
        keys: ['ElContainer'],
      },
      {
        id: 'ElHeader',
        key: 'ElHeader',
        label: 'ElHeader',
        des: '容器头',
        keys: ['ElHeader'],
      },
      {
        id: 'ElMain',
        key: 'ElMain',
        label: 'ElMain',
        des: '容器体',
        keys: ['ElMain'],
      },
      {
        id: 'ElAside',
        key: 'ElAside',
        label: 'ElAside',
        des: '容器侧边',
        keys: ['ElAside'],
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
      },
      {
        id: 'EditText',
        key: 'EditText',
        label: '自定义文案',
        des: '自定义文案, 自定义样式',
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
        icon: '#icon-button-component',
        keys: ['按钮', 'Button', '操作'],
      },
      {
        id: 'Link',
        key: 'Link',
        label: 'link',
        icon: '#icon-link',
        des: '按钮，link',
        keys: ['链接', 'link', '操作'],
      },
      {
        id: 'Tag',
        key: 'Tag',
        label: 'Tag',
        icon: '#icon-biaoqian',
        des: '标签，Icon',
        keys: ['标签', 'Icon', '操作'],
      }
    ]
  },
  {
    label: '图片',
    type: 'component',
    list: [
      {
        id: 'Image',
        key: 'Image',
        label: 'Image',
        icon: '#icon-tupian',
        des: '图片，Image',
        keys: ['图片', 'Image', '展示'],
      },
    ]
    // Image
  },
  {
    label: '其他',
    type: 'component',
    list: [
      {
        id: 'Divider',
        key: 'Divider',
        label: 'Divider',
        icon: '#icon-fengexian',
        des: '分割线, Divider',
        keys: ['分割线', 'Divider']
      },
      {
        id: 'Popconfirm',
        key: 'Popconfirm',
        label: 'Popconfirm',
        icon: '#icon-zujian-danchuang',
        des: '气泡确认框, Popconfirm',
        keys: ['气泡确认框', 'Popconfirm']
      },
      {
        // Avatar
        id: 'Avatar',
        key: 'Avatar',
        label: 'Avatar',
        icon: '',
        des: 'Avatar',
        keys: ['头像', 'Avatar']
      },
      {
        id: 'Icon',
        key: 'Icon',
        label: 'Icon',
        icon: '',
        des: 'Icon',
        keys: ['Icon']
      }
    ]
  }
];

export default class Data {
  
  public getBoxList () {
    return box;
  }

  public getCompList () {
    return {
      form: componentConf,
      table: tableConf,
      // BasicTable: BasicTableConf,
      // BaseForm: BaseFormConf,
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
          if(comp.label.match(RegExp(value, 'i')) || (comp.keys && comp.keys.includes(value))  || comp.des.match(RegExp(value, 'i'))) {
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
        label: '卡片面板',
        type: 'editBox',
        list: [
          // {
          //   id: 'PanelGroup',
          //   key: 'PanelGroup',
          //   label: '数据面板',
          //   path: '/EditBlock/PanelGroup',
          //   thumb: 'https://unpkg.com/@sparrow-vue/images@1.0.1/assets/1000002.png',
          //   icon: ''
          // },
          {
            id: 'CardGroup',
            key: 'CardGroup',
            label: '介绍面板',
            path: '/EditBlock/CardGroup',
            thumb: 'https://unpkg.com/@sparrow-vue/images@1.0.1/assets/1000003.png',
            icon: ''
          },
          {
            id: 'CardDetail',
            key: 'CardDetail',
            label: '卡片详情',
            path: '/EditBlock/CardDetail',
            thumb: 'https://unpkg.com/@sparrow-vue/images@1.0.1/assets/1000001.png',
            icon: ''
          }
        ]
      },
      {
        label: '表单',
        type: 'editBox',
        list: [
          {
            // BaseForm
            id: 'BaseForm',
            key: 'BaseForm',
            label: '基础表单',
            path: '/EditBlock/BaseForm',
            thumb: '',
            icon: ''
          },
          {
            id: 'CardForm',
            key: 'CardForm',
            label: '卡片表单',
            path: '/EditBlock/CardForm',
            thumb: 'https://unpkg.com/@sparrow-vue/images@1.0.1/assets/1000004.png',
            icon: ''
          },
          {
            id: 'StepsForm',
            key: 'StepsForm',
            label: '步骤表单',
            path: '/EditBlock/StepsForm',
            thumb: 'https://unpkg.com/@sparrow-vue/images@1.0.1/assets/1000005.png',
            icon: ''
          },
          {
            id: 'AdvancedTable',
            key: 'AdvancedTable',
            label: '高级表单',
            path: '/EditBlock/AdvancedTable',
            thumb: 'https://unpkg.com/@sparrow-vue/images@1.0.6/assets/1000014.png',
            icon: ''
          },
          {
            id: 'AdvancedSearch',
            key: 'AdvancedSearch',
            label: '折叠搜索表单',
            path: '/EditBlock/AdvancedSearch',
            thumb: 'https://unpkg.com/@sparrow-vue/images@1.0.22/assets/1000033.png',
            icon: ''
          }
        ]
      },
      {
        label: '表格',
        type: 'editBox',
        list: [
          {
            id: 'TableExpand',
            key: 'TableExpand',
            label: '展开行表格',
            path: '/EditBlock/TableExpand',
            thumb: 'https://unpkg.com/@sparrow-vue/images@1.0.1/assets/1000006.png',
            icon: ''
          },
          {
            id: 'ComplexTable',
            key: 'ComplexTable',
            label: '综合表格',
            path: '/EditBlock/ComplexTable',
            thumb: 'https://unpkg.com/@sparrow-vue/images@1.0.3/assets/1000013.png',
            icon: ''
          }
        ]
      },
      // {
      //   label: '列表',
      //   type: 'editBox',
      //   list: [
      //     {
      //       id: 'ListItem',
      //       key: 'ListItem',
      //       label: '列表',
      //       path: '/EditBlock/ListItem',
      //       thumb: '',
      //       icon: ''
      //     },
      //     {
      //       id: 'List1',
      //       key: 'List1',
      //       label: '列表1',
      //       path: '/EditBlock/List1',
      //       thumb: '',
      //       icon: ''
      //     }
      //   ]
      //   // ListItem
      // }
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