export default {
  name: 'BaseForm',
  boxs: [
    {
      data: {
        id: 'form',
        key: 'form',
        boxIndex: 0,
        params: { isForm: false, row: '', col: '', blockName: 'Form1' }
      },
    },
    {
      data: {
        id: 'customInline',
        key: 'customInline',
        params: {
          compBox: 'BaseForm'
        },
        boxIndex: 1,
      }
    }
  ]
};