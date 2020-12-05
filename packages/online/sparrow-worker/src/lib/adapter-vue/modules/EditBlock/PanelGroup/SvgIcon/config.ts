export default {
  model: {
    attr: {
      'icon-class': 'peoples'
    },
    custom: {
      'icon-color': 'icon-color-1'
    }
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
              label: "icon-class",
              model: "icon-class"
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
              type: "select",
              label: "icon-color",
              model: "icon-color",
              values: [
                  "icon-color-1",
                  "icon-color-2",
                  "icon-color-3",
                  "icon-color-4",
              ]    
            }
          ]
        }
      }
    ],
  },
}