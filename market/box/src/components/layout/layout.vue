<script>
import Paragraph from '../paragraph';
export default {
  name: 'layout',
  components: {
    Paragraph
  },
  props: {
    row: {
      type: Number
    },
    col: {
      type: Number,
      required: true
    }
  },
  computed: {
    colSpan () {
      return 24 / this.col;
    }
  },
  render (h) {
    return (
      <div class="layout">
        {
          (new Array(this.row).fill('')).map((rowItem, rowIndex) => {
            return (
              <el-row>
                {
                  (new Array(this.col).fill('')).map((item, index) => {
                    return (
                      <el-col span={this.colSpan}>
                        <div class="layout-col">
                        {this.$slots[`${rowIndex}_${index}`] ?
                          h('div', this.$slots[`${rowIndex}_${index}`]) :
                          <paragraph 
                            params={{ row:rowIndex, col: index }}
                            type={'layout'}
                          ></paragraph>}
                        </div>
                      </el-col>
                    );
                  })
                }
              </el-row>
            );
          })
        }
      </div>
    )
  }
}
</script>
<style lang="scss" scoped>
.layout{
  border-left: 1px dashed #ccc;
  border-right: 1px dashed #ccc;
  border-top: 1px dashed #ccc;
  &-col{
    height: 60px;
    width: 100%;
    border-bottom: 1px dashed #ccc;
    border-right: 1px dashed #ccc;
    padding: 6px;
    box-sizing: border-box;
    overflow: hidden;
  }
  &-edit{
    width: 100%;
    height: 100%;
    outline: none;
    padding: 10px;
    box-sizing: border-box;
  }
}
</style>
