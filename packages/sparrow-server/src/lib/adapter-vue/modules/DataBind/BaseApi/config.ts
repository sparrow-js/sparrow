export default {
  model: {
    custom: {
      url: '',
      methodType: 'get',
      methodName: '',
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
              label: "showMethod",
              model: "showMethod"
            },
            {
              type: "input",
              inputType: "text",
              label: "visible",
              model: "visible"
            },
          ]
        }
      },
    ]
  },
}