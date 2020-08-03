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
    des: '标准输入框',
    keys: ['表单', '组件', '输入框'],
  },
  {
    label: '文本域',
    key: 'Input',
    des: '文本域',
    keys: ['表单', '组件', '输入框', '文本域'],
    params: {
      type: 'textarea',
    }
  },
  {
    label: '输入建议',
    key: 'Autocomplete',
    des: '输入建议',
    keys: ['表单', '组件', '输入框', '输入建议'],
  },
  {
    label: '计数器',
    key: 'InputNumber',
    des: '计数器',
    keys: ['表单', '组件', '输入框', '计数器', '计数'],
  },

  {
    label: '单选框',
    key: 'RadioGroup',
    des: '单选框',
    keys: ['表单', '组件', '单选框'],
  },
  {
    label: '按钮单选',
    key: 'RadioGroup',
    params: {
      type: 'button'
    },
    des: '按钮单选',
    keys: ['表单', '组件', '按钮单选', '单选框'],
  },

  {
    label: '多选框',
    key: 'CheckboxGroup',
    des: '多选框',
    keys: ['表单', '组件', '多选框'],
  },
  {
    label: '多选按钮',
    key: 'CheckboxGroup',
    params: {
      type: 'button'
    },
    des: '多选按钮',
    keys: ['表单', '组件', '多选按钮'],
  },

  {
    label: '选择器',
    key: 'Select',
    des: '选择器',
    keys: ['表单', '组件', '选择器'],
  },
  {
    label: '可清空单选选择器',
    key: 'Select',
    params: {
      type: 'clearable'
    },
    des: '可清空单选器',
    keys: ['表单', '组件', '可清空单选选择器', '选择'],
  },
  {
    label: '多选选择器',
    key: 'Select',
    params: {
      type: 'multiple'
    },
    des: '多选选择器',
    keys: ['表单', '组件', '多选选择器'],
  },
  {
    label: '可搜索选择器',
    key: 'Select',
    params: {
      type: 'filterable'
    },
    des: '可搜索选择器',
    keys: ['表单', '组件', '可搜索选择器'],
  },
  {
    label: '创建条目选择器',
    key: 'Select',
    params: {
      type: 'allow-create'
    },
    des: '创建条目选择器',
    keys: ['表单', '组件', '创建条目选择器'],
  },

  {
    label: '级联选择器',
    key: 'Cascader',
    des: '级联选择器',
    keys: ['表单', '组件', '级联选择器'],
  },

  {
    label: '基础开关',
    key: 'Switch',
    des: '基础开关',
    keys: ['表单', '组件', '基础开关'],
  },

  {
    label: '滑块',
    key: 'Slider',
    des: '基础滑块',
    keys: ['表单', '组件', '基础滑块'],
  },

  {
    label: '时间选择',
    key: 'TimePicker',
    des: '时间选择',
    keys: ['表单', '组件', '时间选择'],
  },
  {
    label: '范围时间选择',
    key: 'TimePicker',
    params: {
      type: 'range',
    },
    des: '范围时间选择',
    keys: ['表单', '组件', '范围时间选择'],
  },

  {
    label: '日期选择',
    key: 'DatePicker',
    des: '日期选择',
    keys: ['表单', '组件', '日期选择'],
  },
  {
    label: '范围日期选择',
    key: 'DatePicker',
    params: {
      type: 'range'
    },
    des: '范围日期选择',
    keys: ['表单', '组件', '范围日期选择'],
  },

  {
    label: '日期时间选择',
    key: 'DateTimePicker',
    des: '日期时间选择',
    keys: ['表单', '组件', '日期时间选择'],
  },
  {
    label: '范围日期时间选择',
    key: 'DateTimePicker',
    params: {
      type: 'range'
    }, 
    des: '范围日期时间选择',
    keys: ['表单', '组件', '范围日期时间选择'],
  },

  {
    label: '用户头像上传',
    key: 'UploadAvatar',
    des: '用户头像上传',
    keys: ['表单', '组件', '用户头像上传'],
  },

  {
    label: '评分',
    key: 'Rate',
    des: '评分',
    keys: ['表单', '组件', '评分'],
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
