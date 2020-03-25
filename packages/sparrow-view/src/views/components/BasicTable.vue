<template>
  <div class="root">
    <table-box>
      <el-table border="" style="width: 100%" :data="tableData">
        <el-table-column prop="column0" label="column0">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="66f2d0e5" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="66f2d0e5" />
          </template>
        </el-table-column>

        <el-table-column prop="column1" label="column1">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="f2d0e560" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="f2d0e560" />
          </template>
        </el-table-column>

        <el-table-column prop="column2" label="column2">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="d0e560c5" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="d0e560c5" />
          </template>
        </el-table-column>

        <el-table-column prop="column3" label="column3">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="e560c508" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <el-button
              size="mini"
              type="danger"
              @click="handleEdit(row, $index)"
            >
              编辑
            </el-button>

            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(row, $index)"
            >
              删除
            </el-button>

            <table-cell-box uuid="e560c508" />
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
    },

    handleEdit(row, index) {
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
