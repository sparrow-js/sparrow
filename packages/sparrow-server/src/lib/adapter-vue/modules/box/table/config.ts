export default {
  model: {
    attr: {
      stripe: '',
      border: 'true',
    },
    custom: {
      col: 5,
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
              label: "stripe",
              model: "stripe",
              textOn: '斑马纹',
              textOff: '非斑马纹'
            },
            {
              type: "input",
              inputType: "text",
              label: "border",
              model: "border",
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
              label: "col",
              model: "col"
            },
           
          ]
        }
      }
    ]
  },
}