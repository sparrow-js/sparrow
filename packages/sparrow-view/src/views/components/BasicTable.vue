<template>
  <div class="root">
    <table-box>
      <el-table border="" style="width: 100%" :data="tableData">
        <el-table-column prop="undefined" label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="b7bdcf39" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="b7bdcf39" />
          </template>
        </el-table-column>

        <el-table-column prop="undefined" label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="bdcf39fe" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="bdcf39fe" />
          </template>
        </el-table-column>

        <el-table-column prop="undefined" label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="cf39fe14" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="cf39fe14" />
          </template>
        </el-table-column>

        <el-table-column prop="undefined" label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="39fe1483" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="39fe1483" />
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
