export default {
  model: {
    attr: {
      'v-if': '',
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
              label: "v-if",
              model: "v-if"
            },
          ]
        }
      },
    ]
  },
}