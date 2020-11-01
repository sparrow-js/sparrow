export default {
  model: {
    attr: {
      style: '',
    },
    custom: {
      label: '文本框',
      type: 'Text',
      class: '',
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
              label: "style",
              model: "style"
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
            },
            {
              type: "input",
              inputType: "text",
              label: "class",
              model: "class"
            },
          ]
        }
      }
    ]
  },
}