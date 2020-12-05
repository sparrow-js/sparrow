export default {
  model: {
    attr: {
      src: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*ZhzDQLMyYlYAAAAAAAAAAABkARQnAQ',
      fit: '',
      alt: '',
      style: 'height: 200px',
      ':lazy': false,
      ':preview-src-list': '',
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
              model: "src"
            },
            {
              type: "input",
              inputType: "text",
              label: "style",
              model: "style"
            },
            {
              type: "select",
              label: "fit",
              model: "fit",
              values: ["fill", "contain", "cover", "none", "scale-down"]
            },
            {
              type: "input",
              inputType: "text",
              label: "alt",
              model: "alt"
            },
            {
              type: "switch",
              label: "lazy",
              model: "lazy",
              textOn: 'lazy',
              textOff: '否lazy'
            },

          ]
        }
      },
    ]
  },
}