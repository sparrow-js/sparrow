export default {
  model: {
    attr: {
      ':fixed': false, // 斑马线
      'sortable': '',
    },
    custom: {
      label: '',
      type: '',
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
              type: "switch",
              readonly: false,
              label: ":fixed",
              model: ":fixed",
              textOn: "固定列",
              textOff: "否固定列",
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
              label: "label",
              model: "label"
            },
            {
              type: "select",
              label: "type",
              model: "type",
              values: ["selection", "index", "expand"]
            },
            {
              type: "input",
              inputType: "text",
              label: "value",
              model: "value"
            },
          ]
        }
      }
    ]
  },
}