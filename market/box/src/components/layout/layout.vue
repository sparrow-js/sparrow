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
          (new Array(this.row).fill('')).map(() => {
            return (
              <el-row>
                {
                  (new Array(this.col).fill('')).map(item => {
                    return (
                      <el-col span={this.colSpan}>
                        <div class="layout-col">
                          <paragraph></paragraph>
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
    height: 48px;
    width: 100%;
    border-bottom: 1px dashed #ccc;
    border-right: 1px dashed #ccc;
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
