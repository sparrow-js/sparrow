export default {
  model: {
    attr: {
      type: '',
      closable: '',
      addable: '',
      editable: '',
      'tab-position': 'top',
      stretch: false,
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
              type: "select",
              label: "type",
              model: "type",
              multi: true,
              values: ["card", "border-card", ""]
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
              label: "addable",
              model: "addable",
              readonly: false,
              textOn: "可增加",
              textOff: "否可增加"
            },
            {
              type: "switch",
              label: "editable",
              model: "editable",
              readonly: false,
              textOn: "同时增加关闭",
              textOff: "否同时增加关闭"
            },
            {
              type: "select",
              label: "type",
              model: "type",
              multi: true,
              values: ["top", "right", "bottom", "left"]
            },
            {
              type: "switch",
              label: "stretch",
              model: "stretch",
              readonly: false,
              textOn: "自撑开",
              textOff: "否自撑开"
            },


          ]
        }
      },
    ]
  },
}