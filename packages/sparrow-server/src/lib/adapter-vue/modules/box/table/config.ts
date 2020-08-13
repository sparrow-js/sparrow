export default {
  model: {
    custom: {
      col: 5,
    },
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
              label: "col",
              model: "col"
            }
          ]
        }
      }
    ]
  },
}