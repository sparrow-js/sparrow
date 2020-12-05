export default {
  model: {
    attr: {
      title: '',
      type: 'success',
      ':closable': false,
      center: '',
      'close-text': '',
      ':show-icon': '',
      effect: '',
    },
    custom: {
      label: '文本框',
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
              label: "title",
              model: "title"
            },
            {
              type: "select",
              label: "type",
              model: "type",
              multi: true,
              values: ["success", "info", "warning", "error"]
            },
            {
              type: "switch",
              label: "closable",
              model: ":closable",
              readonly: false,
              textOn: "可关闭",
              textOff: "否可关闭"
            },
            {
              type: "switch",
              label: "center",
              model: "center",
              readonly: false,
              textOn: "中心",
              textOff: "否中心"
            },
            {
              type: "input",
              inputType: "text",
              label: "close-text",
              model: "close-text"
            },
            {
              type: "input",
              inputType: "text",
              label: "title",
              model: "title"
            },
            {
              type: "switch",
              label: "show-icon",
              model: ":show-icon",
              textOn: "展示icon",
              textOff: "否展示icon"
            },
            {
              type: "select",
              label: "effect",
              model: "effect",
              multi: true,
              values: ["light", "dark"]
            },
            



            {
              type: "input",
              inputType: "text",
              label: "title",
              model: "title"
            },





          ]
        }
      },
    ]
  },
}