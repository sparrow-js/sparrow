<template>
  <div class="root">
    <table-box>
      <el-table border="" style="width: 100%" :data="tableData">
        <el-table-column prop="column0" label="column0">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="facb9085" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="facb9085" />
          </template>
        </el-table-column>

        <el-table-column prop="column1" label="column1">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="cb90858f" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="cb90858f" />
          </template>
        </el-table-column>

        <el-table-column prop="column2" label="column2">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="90858f9d" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="90858f9d" />
          </template>
        </el-table-column>

        <el-table-column prop="column3" label="column3">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="858f9d52" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="858f9d52" />
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
