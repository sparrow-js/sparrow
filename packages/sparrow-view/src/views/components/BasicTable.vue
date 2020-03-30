<template>
  <div class="root">
    <table-box>
      <el-table border="" style="width: 100%" :data="tableData">
        <el-table-column prop="undefined" label="column0">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="0be67484" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="0be67484" />
          </template>
        </el-table-column>

        <el-table-column prop="undefined" label="column1">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="e67484c3" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="e67484c3" />
          </template>
        </el-table-column>

        <el-table-column prop="undefined" label="column2">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="7484c3ff" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="7484c3ff" />
          </template>
        </el-table-column>

        <el-table-column prop="undefined" label="column3">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="84c3ff62" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(row, $index)"
            >
              删除
            </el-button>

            <table-cell-box uuid="84c3ff62" />
          </template>
        </el-table-column>
      </el-table>
    </table-box>
  </div>
</template>

<script>
export default {
  methods: {
    handleDelete(row, index) {
      this.$notify({
        title: "Success",
        message: "Delete Successfully",
        type: "success",
        duration: 2000
      });
    }
  },

  data() {
    return {
      tableData: [{}]
    };
  }
};
</script>
