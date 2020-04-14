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
        config: {
          // 组件自定义配置
          _custom: {
            required: true,
            regList: []
          },
          // 组件标签属性
          _attr: {
            placeholder: '',
          },
          // 插槽属性
          // __slot__: {}
        }
      },
      {
        label: '文本域',
        key: 'Input',
        type: 'textarea',
        config: {
          // 组件自定义配置
          _custom: {
            required: true,
            regList: []
          },
          // 组件标签属性
          _attr: {
            placeholder: '',
          },
        }
      },
      {
        label: '输入建议',
        key: 'Autocomplete',
        config: {
          // 组件自定义配置
          _custom: {
            required: true,
            regList: []
          },
          // 组件标签属性
          _attr: {
            placeholder: '',
          },
        }
      },
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
        key: 'RadioGroup',
      },
      {
        label: '按钮样式',
        key: 'RadioGroup',
        type: 'button'
      }
    ]
  },

  {
    label: '多选框',
    children: [
      {
        label: '基础',
        key: 'CheckboxGroup',
      },
      {
        label: '按钮样式',
        key: 'CheckboxGroup',
        type: 'button'
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
        label: '多选',
        key: 'Select',
        type: 'multiple'
      },
      {
        label: '可搜索',
        key: 'Select',
        type: 'filterable'
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
        label: '选择范围',
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
        label: '选择范围',
        key: 'DateTimePicker',
        type: 'range'
      }
    ]
  },

  {
    label: '上传',
    children: [
      // {
      //   label: '基础',
      //   key: 'Upload',
      // },
      {
        label: '用户头像',
        key: 'UploadAvatar',
      },
      // {
      //   label: '照片墙',
      //   key: 'Upload',
      //   type: 'picture-card'
      // },
      // {
      //   label: '拖拽上传',
      //   key: 'Upload',
      //   type: 'drag'
      // },
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

];