export default {
  model: {
    attr: {
      ':active-name': 'first',
    },
    slot: {
      data: `
[
  {
    label: '用户管理',
    value: 'first'
  },
  {
    label: '配置管理',
    value: 'second'
  },
  {
    label: '角色管理',
    value: 'third'
  },
  {
    label: '定时任务补偿',
    value: 'fourth'
  },
]
      `
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
              label: "active-name",
              model: ":active-name"
            }
          ]
        }
      },
      {
        type: 'object',
        label: '',
        model: 'slot',
        schema: {
          fields: [
            {
              type: "sourcecode",
              label: "data",
              model: "data",
              theme: 'neo',
              mode: {
                name: "javascript",
                json: true
              }
            }
          ]
        }
      }
    ]
  },
}