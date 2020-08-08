export default {
  model: {
    attr: {
      span: '',
      offset: '',
      push: '',
      pull: '',
      xs: '',
      sm: '',
      md: '',
      lg: '',
      xl: '',
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
    ]
  },
  formOptions: {
    validateAfterLoad: true,
    validateAfterChanged: true,
    validateAsync: true
  }
}