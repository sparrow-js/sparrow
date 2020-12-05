export default {
  model: {
    attr: {
      stripe: '', // 斑马线
      ':border': true, // 边框
      height: '', // 固定表头
      'max-height': '',
      'highlight-current-row': '',
      ':default-sort': ''
    },
    custom: {
      col: 5,
      checkbox: false,
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
              type: "switch",
              label: "border",
              model: ":border",
              textOn: 'border',
              textOff: '非border'
            },
            {
              type: "input",
              inputType: "text",
              label: "height",
              model: "height",
            },
            {
              type: "input",
              inputType: "text",
              label: "max-height",
              model: "max-height",
            },
            {
              type: "input",
              inputType: "text",
              label: "highlight-current-row",
              model: "highlight-current-row",
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
            {
              type: "checkbox",
              label: "checkbox",
              model: "checkbox",
              default: true
            }
          ]
        }
      }
    ]
  },
}