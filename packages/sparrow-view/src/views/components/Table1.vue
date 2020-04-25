<template>
  <div class="root">
    <table-box>
      <el-table border="" style="width: 100%" :data="tableData">
        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="4a41d69a" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="4a41d69a" />
          </template>
        </el-table-column>

        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="41d69a42" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="41d69a42" />
          </template>
        </el-table-column>

        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="d69a4239" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="d69a4239" />
          </template>
        </el-table-column>

        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="9a42392d" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="9a42392d" />
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
      tableData: [{}, {}, {}]
    };
  }
};
</script>
