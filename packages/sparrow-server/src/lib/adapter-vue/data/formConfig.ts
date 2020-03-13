export const formConf = {
  formRef: 'elForm',
  formModel: 'formData',
  size: 'medium',
  labelPosition: 'right',
  labelWidth: 100,
  formRules: 'rules',
  gutter: 15,
  disabled: false,
  span: 24,
  formBtns: true
}

export const componentConf = [
  {
    label: '输入框',
    children: [
      {
        label: '基础文本框',
        key: 'Input',
      },
      {
        label: '文本域',
        key: 'Input',
        type: 'textarea',
      },
      {
        label: '输入建议',
        key: 'Autocomplete',
      },
      {
        label: '远程搜索',
        key: 'Autocomplete',
        type: 'fetch'
      }
    ]
  },


  {
    label: '计数器',
    children: [
      {
        label: '计数器',
        key: 'InputNumber',
      }
    ]
  },

  {
    label: '单选框',
    children: [
      {
        label: '基础',
        key: 'Radio',
      },
      {
        label: '按钮样式',
        key: 'RadioButton',
      }
    ]
  },

  {
    label: '多选框',
    children: [
      {
        label: '基础',
        key: 'Checkbox',
      },
      {
        label: '按钮样式',
        key: 'CheckboxButton',
      }
    ]
  },

  {
    label: '选择器',
    children: [
      {
        label: '基础',
        key: 'Select',
      },
      {
        label: '可清空单选',
        key: 'Select',
        type: 'clearable'
      },
      {
        label: '基础多选',
        key: 'Select',
        type: 'multiple'
      },
      {
        label: '可搜索',
        key: 'Select',
        type: 'filterable'
      },
      {
        label: '远程搜索',
        key: 'Select',
        type: 'remote'
      },
      {
        label: '创建条目',
        key: 'Select',
        type: 'allow-create'
      }
    ]
  },

  {
    label: '级联选择器',
    children: [
      {
        label: '基础级联',
        key: 'Cascader',
      },
    ]
  },

  {
    label: '开关',
    children: [
      {
        label: '基础开关',
        key: 'Switch',
      }
    ]
  },

  {
    label: '滑块',
    children: [
      {
        label: '基础滑块',
        key: 'Slider',
      }
    ]
  },

  {
    label: '时间选择器',
    children: [
      {
        label: '基础',
        key: 'TimePicker',
      },
      {
        label: '任意',
        key: 'TimePicker',
        type: 'range',
      }
    ]
  },

  {
    label: '日期选择器',
    children: [
      {
        label: '基础',
        key: 'DatePicker',
      },
      {
        label: '选择范围',
        key: 'DatePicker',
        type: 'range'
      },
      {
        label: '选择范围',
        key: 'DatePicker',
        type: 'range'
      }
    ]
  },

  {
    label: '日期时间选择器',
    children: [
      {
        label: '日期时间',
        key: 'DateTimePicker',
      },
      {
        label: '日期时间',
        key: 'DateTimePicker',
        type: 'range'
      }
    ]
  },

  {
    label: '上传',
    children: [
      {
        label: '基础',
        key: 'Upload',
      },
      {
        label: '用户头像',
        key: 'Upload',
        type: 'avatar'
      },
      {
        label: '照片墙',
        key: 'Upload',
        type: 'picture-card'
      },
      {
        label: '拖拽上传',
        key: 'Upload',
        type: 'drag'
      },
    ]
  },

  {
    label: '评分',
    children: [
      {
        label: '基础',
        key: 'Rate',
      }
    ]
  },

  {
    label: '穿梭框',
    children: [
      {
        label: '基础',
        key: 'Transfer',
      }
    ]
  }

];

/**
 *  {
    label: '单行文本',
    tag: 'el-input',
    tagIcon: 'input',
    placeholder: '请输入',
    defaultValue: undefined,
    span: 24,
    showLabel: true,
    labelWidth: null,
    style: { width: '100%' },
    clearable: true,
    prepend: '',
    append: '',
    'prefix-icon': '',
    'suffix-icon': '',
    maxlength: null,
    'show-word-limit': false,
    readonly: false,
    disabled: false,
    required: true,
    regList: [],
    changeTag: true,
    document: 'https://element.eleme.cn/#/zh-CN/component/input'
  },
 */
