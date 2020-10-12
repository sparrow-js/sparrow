export default {
  model: {
    attr: {
      ':size': "large",
      ':src': "'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'",
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
              label: "src",
              model: ":src"
            },
            {
              type: "input",
              inputType: "text",
              label: "size",
              model: ":size"
            },
          ]
        }
      },
    ]
  },
}