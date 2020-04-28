<template>
  <div class="root">
    <table-box>
      <el-table border="" style="width: 100%" :data="tableData">
        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="75feeb60" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="75feeb60" />
          </template>
        </el-table-column>

        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="feeb604f" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="feeb604f" />
          </template>
        </el-table-column>

        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="eb604fd4" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="eb604fd4" />
          </template>
        </el-table-column>

        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="604fd439" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="604fd439" />
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
