export default {
  model: {
    attr: {
      width: ''
    },
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
              type: "input",
              inputType: "text",
              label: "width",
              model: "width"
            },
          ]
        }
      },
    ]
  },
}