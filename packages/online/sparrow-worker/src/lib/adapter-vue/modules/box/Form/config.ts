export default {
  model: {
    attr: {
      'ref': '',
      'label-position': '',
      ':inline': false,
      'label-width': '100px',
      'size': ''
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
              label: "ref",
              model: "ref"
            },
            {
              type: "select",
              label: "label-position",
              model: "label-position",
              values: ["right", "left", "top", ""]
            },
            {
              type: "switch",
              label: "inline",
              model: ":inline",
              textOn: 'inline',
              textOff: '非inline'
            },
            {
              type: "input",
              inputType: "text",
              label: "label-width",
              model: "label-width"
            },
            {
              type: "select",
              label: "size",
              model: "size",
              values: ["medium", "small", "mini"]
            },
          ]
        }
      },
    ]
  },
}