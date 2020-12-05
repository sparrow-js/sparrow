export default {
  model: {
    attr: {
      direction: "",
      'content-position': '',
    },
    custom: {
      label: '输入文本',
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
              type: "select",
              label: "direction",
              model: "direction",
              multi: true,
              values: ["horizontal", "vertical", ""]
            },
            {
              type: "select",
              label: "content-position",
              model: "content-position",
              multi: true,
              values: ["left", "right", "center", ""]
            },
          ]
        }
      },
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
            }
          ]
        }
      }
    ]
  },
}