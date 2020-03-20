<template>
  <div class="root">
    <table-box>
      <el-table border="" style="width: 100%" :data="tableData">
        <el-table-column
          prop="date"
          label="日期"
          width="180"
          :render-header="renderHeader"
        >
          <template slot-scope="scope">
            <table-cell-box></table-cell-box>
          </template>
        </el-table-column>

        <el-table-column
          prop="date"
          label="日期"
          width="180"
          :render-header="renderHeader"
        >
          <template slot-scope="scope">
            <table-cell-box></table-cell-box>
          </template>
        </el-table-column>

        <el-table-column
          prop="date"
          label="日期"
          width="180"
          :render-header="renderHeader"
        >
          <template slot-scope="scope">
            <table-cell-box></table-cell-box>
          </template>
        </el-table-column>

        <el-table-column
          prop="date"
          label="日期"
          width="180"
          :render-header="renderHeader"
        >
          <template slot-scope="scope">
            <table-cell-box></table-cell-box>
          </template>
        </el-table-column>
      </el-table>
    </table-box>
  </div>
</template>

<script>
export default {
  methods: {
    renderHeader(h, { column, $index }) {
      return <table-header-box label={column.label}></table-header-box>;
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    }
  },

  data() {
    return {
      tableData: [
        {}
      ]
    };
  }
};
</script>
