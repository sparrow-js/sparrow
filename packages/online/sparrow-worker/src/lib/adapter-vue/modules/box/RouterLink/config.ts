export default {
  model: {
    attr: {
      ':to': "''"
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
              label: ":to",
              model: ":to"
            },
          ]
        }
      },
    ]
  },
}