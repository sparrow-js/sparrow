export default {
  model: {
    attr: {
      bordered: false,
      ':title': "'title'",
      ':content': "'content'",
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
              type: "switch",
              label: "bordered",
              model: "bordered",
              textOn: '边框',
              textOff: '非边框'
            },
            {
              type: "input",
              inputType: "text",
              label: "title",
              model: ":title"
            },
            {
              type: "input",
              inputType: "text",
              label: "content",
              model: ":content"
            },
          ]
        }
      },

    ]
  },
}