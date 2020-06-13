<template>
  <div class="root">
    <table-box>
      <el-table border="" style="width: 100%" :data="tableData">
        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="a6cef60c" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="a6cef60c" />
          </template>
        </el-table-column>

        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="cef60c1a" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="cef60c1a" />
          </template>
        </el-table-column>

        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="f60c1ac4" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="f60c1ac4" />
          </template>
        </el-table-column>

        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="0c1ac426" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="0c1ac426" />
          </template>
        </el-table-column>

        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="1ac42640" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="1ac42640" />
          </template>
        </el-table-column>
      </el-table>
    </table-box>
    <div class="other">
      <div class="block-list">
        <box :uuid="'40b3b4db'" class="block-item">
          <div>
            <el-button
              type="primary"
              size="small"
              @click="dialogVisibleHandlerb3b4db75"
              >弹窗</el-button
            >
            <div class="comp-box">
              <el-dialog
                width="70%"
                title="收货地址"
                :visible.sync="dialogVisible"
              >
                <div class="dialog-home">
                  <div class="block-list">
                    <box :uuid="'b4db75d4'" class="block-item">
                      <div class="box">
                        <Form11 />
                      </div>
                    </box>
                  </div>

                  <div class="block-list">
                    <box :uuid="'75d40299'" class="block-item">
                      <paragraph
                        :type="'Container'"
                        :emit="'client.component.show'"
                        :params="{ uuid: '75d40299' }"
                      />
                    </box>
                  </div>
                </div>
              </el-dialog>
            </div>
          </div>
        </box>
      </div>
    </div>
  </div>
</template>

<script>
import Form11 from "../components/Form11";
export default {
  components: {
    Form11
  },
  methods: {
    dialogVisibleHandlerb3b4db75() {
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
