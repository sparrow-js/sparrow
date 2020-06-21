<template>
  <div class="root">
    <el-table border="" style="width: 100%" :data="tableData">
      <el-table-column label=""> </el-table-column>

      <el-table-column label=""> </el-table-column>

      <el-table-column label=""> </el-table-column>

      <el-table-column label=""> </el-table-column>

      <el-table-column label="">
        <template slot-scope="{ row, column, $index }">
          <el-button
            type="primary"
            size="small"
            @click="dialogVisibleHandler7554e1a8"
            >弹窗</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="other">
      <div class="block-list">
        <div>
          <div class="comp-box">
            <el-dialog
              width="70%"
              title="收货地址"
              :visible.sync="dialogVisible"
            >
              <div class="dialog-home">
                <div class="block-list">
                  <Form />
                </div>

                <div class="block-list">
                  <paragraph
                    :type="'Container'"
                    :emit="'client.component.show'"
                    :params="{ uuid: 'a82fc945' }"
                  />
                </div>
              </div>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Form from "../components/Form";
export default {
  components: {
    Form
  },
  methods: {
    dialogVisibleHandler7554e1a8() {
      this.dialogVisible = !this.dialogVisible;
    }
  },

  data() {
    return {
      tableData: [{}],
      dialogVisible: false
    };
  }
};
</script>
