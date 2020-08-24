export default {
  model: {
    attr: {
      size: 'medium',
      type: 'primary',
      closable: false,
      'disable-transitions': false,
      hit: false,
      color: '',
      effect: 'light',
      'v-if': ''
    },
    custom: {
      label: '主要标签',
      value: '',
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
              type: "select",
              label: "size",
              model: "size",
              multi: true,
              values: ["medium", "small", "mini"]
            },
            {
              type: "select",
              label: "type",
              model: "type",
              multi: true,
              values: ["success", "info", "warning", "danger"]
            },
            {
              type: "switch",
              label: "closable",
              model: "closable",
              readonly: false,
              textOn: "可关闭",
              textOff: "否可关闭"
            },
            {
              type: "switch",
              label: "disable-transitions",
              model: "disable-transitions",
              readonly: false,
              textOn: "禁用渐变",
              textOff: "否禁用渐变"
            },
            {
              type: "switch",
              label: "hit",
              model: "hit",
              readonly: false,
              textOn: "描边",
              textOff: "否描边"
            },
            {
              type: "input",
              inputType: "text",
              label: "color",
              model: "color",
            },
            {
              type: "select",
              label: "effect",
              model: "effect",
              multi: true,
              values: ["dark", "light", "plain"]
            },
            {
              type: "input",
              inputType: "text",
              label: "v-if",
              model: "v-if",
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
              label: "value",
              model: "value",
            },
          ]
        }  
      }


    ]
  },
}