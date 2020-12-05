export default {
  model: {
    custom: {
      label: '弹窗',
    }
  },
  schema: {
    fields: [
      {
        type: 'object',
        label: '',
        model: 'custom',
        schema: {
          fields: [
            {
              type: "input",
              inputType: "text",
              label: "label",
              model: "label"
            },
          ]
        }
      },
    ]
  },
}