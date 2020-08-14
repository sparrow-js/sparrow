export default {
  model: {
    attr: {
      'shadow': 'always',
      ':body-style': '{}'
    },
    custom: {
      'hasHeader': true,
      label: '卡片',
    }
  },
  schema: {
    fields: [
      {
        type: 'object',
        label: '',
        model: 'custom',
        schema: {
          fields: [
            {
              type: "switch",
              label: "hasHeader",
              model: "hasHeader",
              textOn: '有头',
              textOff: '非有头'
            },
            {
              type: "input",
              inputType: "text",
              label: "label",
              model: "label"
            }
          ]
        }
      },
      {
        type: 'object',
        label: '',
        model: 'attr',
        schema: {
          fields: [
            {
              type: "select",
              label: "shadow",
              model: "shadow",
              values: ["always", "hover", "never"]
            },
            {
              type: "sourcecode",
              label: "body-style",
              model: ":body-style",
              theme: 'neo',
              mode: {
                name: "javascript",
                json: true
              }
            }

          ]
        }
      },
    ]
  },
}