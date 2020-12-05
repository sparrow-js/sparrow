
export default {
  model: {
    attr: {},
    custom: {
      label: '步骤1',
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