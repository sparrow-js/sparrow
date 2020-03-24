<template>
  <div class="root">
    <table-box>
      <el-table border="" style="width: 100%" :data="tableData">
        <el-table-column prop="column0" label="column0">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="dd7c29e4" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="dd7c29e4" />
          </template>
        </el-table-column>

        <el-table-column prop="column1" label="column1">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="7c29e4c6" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="7c29e4c6" />
          </template>
        </el-table-column>

        <el-table-column prop="column2" label="column2">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="29e4c6bf" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="29e4c6bf" />
          </template>
        </el-table-column>

        <el-table-column prop="column3" label="column3">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="e4c6bfa3" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="e4c6bfa3" />
          </template>
        </el-table-column>
      </el-table>
    </table-box>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{}]
    };
  }
};
</script>
