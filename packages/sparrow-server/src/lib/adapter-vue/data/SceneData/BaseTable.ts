export default {
  name: 'BaseTable',
  boxs: [
    {
      data: {
        id: 'form',
        key: 'form',
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
      }
    },
    {
      data: {
        id: 'table',
        key: 'table',
        params: { isForm: false, row: '', col: '4', blockName: 'Table1' }
      }
    },
    {
      data: {
        id: 'inline',
        key: 'inline',
        innerHtml: `<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />`
      }
    },
  ]
};