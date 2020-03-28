<template>
  <div class="root">
    <table-box>
      <el-table border="" style="width: 100%" :data="tableData">
        <el-table-column prop="column0" label="column0">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="af5bebc6" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="af5bebc6" />
          </template>
        </el-table-column>

        <el-table-column prop="column1" label="column1">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="5bebc692" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="5bebc692" />
          </template>
        </el-table-column>

        <el-table-column prop="column2" label="column2">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="ebc6923d" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="ebc6923d" />
          </template>
        </el-table-column>

        <el-table-column prop="column3" label="column3">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="c6923d25" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="c6923d25" />
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
