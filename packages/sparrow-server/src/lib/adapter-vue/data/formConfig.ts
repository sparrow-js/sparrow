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
    key: 'Input',
  },
  {
    label: '文本域',
    key: 'Input',
    params: {
      type: 'textarea',
    }
  },
  {
    label: '输入建议',
    key: 'Autocomplete',
  },
  {
    label: '计数器',
    key: 'InputNumber',
  },

  {
    label: '单选框',
    key: 'RadioGroup',
  },
  {
    label: '按钮单选样式',
    key: 'RadioGroup',
    params: {
      type: 'button'
    },
  },

  {
    label: '多选框',
    key: 'CheckboxGroup',
  },
  {
    label: '多选按钮样式',
    key: 'CheckboxGroup',
    params: {
      type: 'button'
    },
  },

  {
    label: '选择器',
    key: 'Select',
  },
  {
    label: '可清空单选选择器',
    key: 'Select',
    params: {
      type: 'clearable'
    },
  },
  {
    label: '多选选择器',
    key: 'Select',
    params: {
      type: 'multiple'
    },
  },
  {
    label: '可搜索选择器',
    key: 'Select',
    params: {
      type: 'filterable'
    },
  },
  {
    label: '创建条目选择器',
    key: 'Select',
    params: {
      type: 'allow-create'
    },
  },

  {
    label: '级联选择器',
    key: 'Cascader',
  },

  {
    label: '基础开关',
    key: 'Switch',
  },

  {
    label: '基础滑块',
    key: 'Slider',
  },

  {
    label: '时间选择器',
    key: 'TimePicker',
  },
  {
    label: '选择范围时间选择器',
    key: 'TimePicker',
    params: {
      type: 'range',
    },
  },

  {
    label: '日期选择器',
    key: 'DatePicker',
  },
  {
    label: '选择范围日期选择器',
    key: 'DatePicker',
    params: {
      type: 'range'
    },
  },

  {
    label: '日期时间选择器',
    key: 'DateTimePicker',
  },
  {
    label: '选择范围日期时间选择器',
    key: 'DateTimePicker',
    params: {
      type: 'range'
    }, 
  },

  {
    label: '用户头像上传',
    key: 'UploadAvatar',
  },

  {
    label: '评分',
    key: 'Rate',
  },
  // {
  //   label: '联动容器',
  //   key: 'LogicBox',
  //   params: {
  //     type: 'box'
  //   },
  // },
  // {
  //   label: '自增容器',
  //   key: 'ArrayListBox',
  //   params: {
  //     type: 'box'
  //   },
  // },
  // {
  //   label: '卡片容器',
  //   key: 'CardBox',
  //   params: {
  //     type: 'box'
  //   },
  // },
  // {
  //   label: 'tabs容器',
  //   key: 'TabsBox',
  //   params: {
  //     type: 'box'
  //   }, 
  // },
];
