export default {
  model: {
    attr: {
      type: 'primary',
      underline: false,
      disabled: false,
      href: '',
    },
    custom: {
      label: '文字链接',
      value: ''
    }
  },
  schema: {
    fields: [
      {
        type: 'object',
        label: '',
        model: 'attr',
        schema: {
          fields: [
            {
              type: "select",
              label: "type",
              model: "type",
              multi: true,
              values: ["success", "info", "warning", "danger"]
            },
            {
              type: "switch",
              label: "underline",
              model: "underline",
              readonly: false,
              textOn: "下划线",
              textOff: "否下划线"
            },
            {
              type: "switch",
              label: "disabled",
              model: "disabled",
              readonly: false,
              textOn: "禁用",
              textOff: "否禁用"
            },
            {
              type: "input",
              inputType: "text",
              label: "href",
              model: "href",
            },
          ]
        }
      },
      {
        type: 'object',
        label: '',
        model: 'custom',
        schema: {
          fields: [
            {
              type: "input",
              inputType: "text",
              label: "value",
              model: "value",
            },
          ]
        }  
      }
    ]
  },
}