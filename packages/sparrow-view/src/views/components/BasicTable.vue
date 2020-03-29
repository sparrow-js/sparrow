<template>
  <div class="root">
    <table-box>
      <el-table border="" style="width: 100%" :data="tableData">
        <el-table-column prop="column0" label="column0">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="25c39985" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="25c39985" />
          </template>
        </el-table-column>

        <el-table-column prop="column1" label="column1">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="c39985c9" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="c39985c9" />
          </template>
        </el-table-column>

        <el-table-column prop="column2" label="column2">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="9985c9e1" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="9985c9e1" />
          </template>
        </el-table-column>

        <el-table-column prop="column3" label="column3">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="85c9e162" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="85c9e162" />
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
