export default {
  model: {
    attr: {
      placeholder: '',
      'v-model': ''
    },
    custom: {
      required: false,
      label: '评分',
      type: 1
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
              label: "v-model",
              model: "v-model"
            },
            {
              type: "input",
              inputType: "text",
              label: "placeholder",
              model: "placeholder"
            }
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
              type: "switch",
              label: "required",
              model: "required",
              textOn: '必填',
              textOff: '非必填'
            },
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