export default {
  model: {
    attr: {
      'label-position': ''
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
              label: "label-position",
              model: "label-position"
            },
          ]
        }
      },
    ]
  },
}