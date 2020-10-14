export default {
  model: {
    attr: {
      'v-if': '',
      class: '',
    },
    custom: {
      display: 'block',
      'flex-direction': 'column',
      'justify-content': '',
      'align-items': '',
      'flex-wrap': '',
      'style': '',
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
              label: "v-if",
              model: "v-if"
            },
            {
              type: "input",
              inputType: "text",
              label: "class",
              model: "class"
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
              type: "radios",
              label: "display",
              model: "display",
              values: [
                "flex",
                "block",
                'inline-block'
              ]
            },
            {
              type: "radios",
              label: "flex-direction",
              model: "flex-direction",
              values: [
                "row",
                "row-reverse",
                'column',
                'column-reverse'
              ]
            },

            {
              type: "radios",
              label: "align-items",
              model: "align-items",
              values: [
                "flex-start",
                "flex-end",
                'baseline',
                'center',
                'stretch'
              ]
            },

            {
              type: "radios",
              label: "justify-content",
              model: "justify-content",
              values: [
                "flex-start",
                "flex-end",
                'center',
                'space-between',
                'space-around'
              ]
            },

            {
              type: "radios",
              label: "flex-wrap",
              model: "flex-wrap",
              values: [
                "nowrap",
                "wrap",
                'wrap-reverse',
              ]
            },

            {
              type: "input",
              inputType: "text",
              label: "style",
              model: "style"
            },
          ]
        }
      },

    ],

  },
}