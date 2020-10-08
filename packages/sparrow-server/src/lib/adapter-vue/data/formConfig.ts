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
    icon: '#icon-shurukuang',
    keys: ['表单', '组件', '输入框'],
  },
  {
    label: '文本域',
    key: 'Input',
    des: '文本域',
    icon: '#icon-wenbenyu',
    keys: ['表单', '组件', '输入框', '文本域'],
    params: {
      type: 'textarea',
    }
  },
  {
    label: '输入建议',
    key: 'Autocomplete',
    des: '输入建议',
    icon: '#icon-Advice_icon',
    keys: ['表单', '组件', '输入框', '输入建议'],
  },
  {
    label: '计数器',
    key: 'InputNumber',
    des: '计数器',
    icon: '#icon-jisuanqi',
    keys: ['表单', '组件', '输入框', '计数器', '计数'],
  },

  {
    label: '单选框',
    key: 'RadioGroup',
    des: '单选框',
    icon: '#icon-danxuankuang',
    keys: ['表单', '组件', '单选框'],
  },
  {
    label: '按钮单选',
    key: 'RadioGroup',
    icon: '#icon-danxuankuang',
    params: {
      type: 'button'
    },
    des: '按钮单选',
    keys: ['表单', '组件', '按钮单选', '单选框'],
  },

  {
    label: '多选框',
    key: 'CheckboxGroup',
    icon: '#icon-duoxuankuangxuanzhong',
    des: '多选框',
    keys: ['表单', '组件', '多选框'],
  },
  {
    label: '多选按钮',
    key: 'CheckboxGroup',
    icon: '#icon-duoxuankuangxuanzhong',
    params: {
      type: 'button'
    },
    des: '多选按钮',
    keys: ['表单', '组件', '多选按钮'],
  },

  {
    label: '选择器',
    key: 'Select',
    icon: '#icon-xuanzeqi',
    des: '选择器',
    keys: ['表单', '组件', '选择器'],
  },
  {
    label: '清空单选',
    key: 'Select',
    icon: '#icon-xuanzeqi',
    params: {
      type: 'clearable'
    },
    des: '可清空单选器',
    keys: ['表单', '组件', '可清空单选选择器', '选择'],
  },
  {
    label: '多选选择器',
    key: 'Select',
    icon: '#icon-xuanzeqi',
    params: {
      type: 'multiple'
    },
    des: '多选选择器',
    keys: ['表单', '组件', '多选选择器'],
  },
  {
    label: '搜索选择器',
    key: 'Select',
    icon: '#icon-xuanzeqi',
    params: {
      type: 'filterable'
    },
    des: '可搜索选择器',
    keys: ['表单', '组件', '可搜索选择器'],
  },
  {
    label: '创建条目',
    key: 'Select',
    icon: '#icon-xuanzeqi',
    params: {
      type: 'allow-create'
    },
    des: '创建条目选择器',
    keys: ['表单', '组件', '创建条目选择器'],
  },

  {
    label: '级联选择器',
    key: 'Cascader',
    icon: '#icon-jiliandongxuanzeqi',
    des: '级联选择器',
    keys: ['表单', '组件', '级联选择器'],
  },

  {
    label: '基础开关',
    key: 'Switch',
    des: '基础开关',
    icon: '#icon-kaiguan',
    keys: ['表单', '组件', '基础开关'],
  },

  {
    label: '滑块',
    key: 'Slider',
    des: '基础滑块',
    icon: '#icon-huakuai',
    keys: ['表单', '组件', '基础滑块'],
  },

  {
    label: '时间选择',
    key: 'TimePicker',
    des: '时间选择',
    icon: '#icon-shijian',
    keys: ['表单', '组件', '时间选择'],
  },
  {
    label: '范围时间',
    key: 'TimePicker',
    icon: '#icon-shijian',
    params: {
      type: 'range',
    },
    des: '范围时间',
    keys: ['表单', '组件', '范围时间选择'],
  },

  {
    label: '日期选择',
    key: 'DatePicker',
    des: '日期选择',
    icon: '#icon-riqi',
    keys: ['表单', '组件', '日期选择'],
  },
  {
    label: '范围日期',
    key: 'DatePicker',
    icon: '#icon-riqi',
    params: {
      type: 'range'
    },
    des: '范围日期',
    keys: ['表单', '组件', '范围日期选择'],
  },

  {
    label: '日期时间',
    key: 'DateTimePicker',
    des: '日期时间选择',
    icon: '#icon-riqi',
    keys: ['表单', '组件', '日期时间选择'],
  },
  {
    label: '范围日时',
    key: 'DateTimePicker',
    icon: '#icon-riqi',
    params: {
      type: 'range'
    }, 
    des: '范围日期时间',
    keys: ['表单', '组件', '范围日期时间选择'],
  },

  {
    label: '头像上传',
    key: 'UploadAvatar',
    des: '用户头像上传',
    icon: '#icon-icon-test',
    keys: ['表单', '组件', '用户头像上传'],
  },

  {
    label: '评分',
    key: 'Rate',
    des: '评分',
    icon: '#icon-pingfen',
    keys: ['表单', '组件', '评分'],
  },
  {
    label: '详情展示',
    key: 'FormEditText',
    des: '详情展示',
    icon: '',
    keys: ['表单', '详情展示'],
  }
];
