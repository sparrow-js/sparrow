
export default {
  model: {
    attr: {},
    custom: {
      label: 'label',
      name: 'first',
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
            {
              type: "input",
              inputType: "text",
              label: "name",
              model: "name"
            },
          ]
        }
      },
    ]
  },
}