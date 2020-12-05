export default {
  model: {
    attr: {
      gutter: '',
      type: '',
      justify: '',
      align: '',
      tag: '',
    },
    custom: {},
    
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
              label: "gutter",
              model: "gutter"
            },
            {
              type: "input",
              inputType: "text",
              label: "type",
              model: "type"
            },
            {
              type: "input",
              inputType: "text",
              label: "justify",
              model: "justify"
            },
            {
              type: "input",
              inputType: "text",
              label: "align",
              model: "align"
            },
            {
              type: "input",
              inputType: "text",
              label: "tag",
              model: "tag"
            },
          ]
        }
      },
    ]
  },
}