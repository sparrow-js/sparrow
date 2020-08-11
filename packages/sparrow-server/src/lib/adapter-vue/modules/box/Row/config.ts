export default {
  model: {
    attr: {
      ':span': '',
      ':offset': '',
      ':push': '',
      ':pull': '',
      ':xs': '',
      ':sm': '',
      ':md': '',
      ':lg': '',
      ':xl': '',
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
              label: "span",
              model: ":span"
            },
            {
              type: "input",
              inputType: "text",
              label: "offset",
              model: ":offset"
            },
            {
              type: "input",
              inputType: "text",
              label: "push",
              model: ":push"
            },
            {
              type: "input",
              inputType: "text",
              label: "pull",
              model: ":pull"
            },
            {
              type: "input",
              inputType: "text",
              label: "xs",
              model: ":xs"
            },
            {
              type: "input",
              inputType: "text",
              label: "sm",
              model: ":sm"
            },
            {
              type: "input",
              inputType: "text",
              label: "md",
              model: ":md"
            },
            {
              type: "input",
              inputType: "text",
              label: "lg",
              model: ":lg"
            },
            {
              type: "input",
              inputType: "text",
              label: "xl",
              model: ":xl"
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