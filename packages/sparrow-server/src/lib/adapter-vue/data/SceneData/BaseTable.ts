export default {
  name: 'BaseTable',
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
          compBox: 'BasicTable'
        },
        boxIndex: 1,
      }
    },
    {
      data: {
        id: 'table',
        key: 'table',
        boxIndex: 2,
        params: { isForm: false, row: '', col: '4', blockName: 'Table1' }
      }
    },
    {
      data: {
        id: 'inline',
        key: 'inline',
        boxIndex: 3,
        innerHtml: `<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />`
      }
    },
  ]
};