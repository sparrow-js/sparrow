export default {
  model: {
    attr: {
      class: 'el-icon-question'
    },
    custom: {
      color: '',
      'font-size': '',
      style: '',
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
              type: "select",
              label: "color",
              model: "color",
              values: ["#409EFF", "#67C23A", "#E6A23C", "#F56C6C", "#909399"]
            },

            {
              type: "select",
              label: "font-size",
              model: "font-size",
              values: ["12px", "16px", "20px", "24px", "30px", "48px", "64px"]
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

    ]
  },
}