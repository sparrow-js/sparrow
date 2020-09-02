export default {
  model: {
    attr: {
      size: 'medium',
      type: 'primary',
      ':plain': false,
      round: false,
      circle: false,
      loading: false,
      disabled: false,
      icon: '',
      style: '',
      '@click': '',
      'v-if': '',
    },
    custom: {
      label: '主要按钮'
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
              values: ["primary", "success", "warning", "danger", "info", "text"]
            },
            {
              type: "switch",
              label: "plain",
              model: "plain",
              readonly: false,
              textOn: "朴素",
              textOff: "否朴素"
            },
            {
              type: "switch",
              label: "round",
              model: "round",
              readonly: false,
              textOn: "圆角",
              textOff: "否圆角"
            },
            {
              type: "switch",
              label: "circle",
              model: "circle",
              readonly: false,
              textOn: "圆形",
              textOff: "否圆形"
            },
            {
              type: "switch",
              label: "loading",
              model: "loading",
              readonly: false,
              textOn: "loading",
              textOff: "否loading"
            },
            {
              type: "switch",
              label: "disabled",
              model: "disabled",
              readonly: false,
              textOn: "disabled",
              textOff: "否disabled"
            },
            {
              type: "input",
              inputType: "text",
              label: "icon",
              model: "icon",
            },
            {
              type: "input",
              inputType: "text",
              label: "click",
              model: "@click",
            },
            {
              type: "input",
              inputType: "text",
              label: "v-if",
              model: "v-if",
            }
          ]
        }
      },
    ]
  },
}