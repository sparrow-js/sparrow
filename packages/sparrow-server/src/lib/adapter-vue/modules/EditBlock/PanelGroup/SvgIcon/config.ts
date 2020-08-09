export default {
  model: {
    attr: {
      'icon-class': 'peoples'
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
              label: "icon-class",
              model: "icon-class"
            }
          ]
        }
      }
    ]
  },
}