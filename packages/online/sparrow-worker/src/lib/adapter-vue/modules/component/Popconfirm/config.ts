export default {
  model: {
    custom: {
      label: '确定删除吗？',
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