<template>
  <div class="root">
    <table-box>
      <el-table border="" style="width: 100%" :data="tableData">
        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="4405e061" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="4405e061" />
          </template>
        </el-table-column>

        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="05e0616f" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="05e0616f" />
          </template>
        </el-table-column>

        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="e0616feb" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="e0616feb" />
          </template>
        </el-table-column>

        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="616febec" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="616febec" />
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
