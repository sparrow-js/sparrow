<template>
  <div class="root">
    <table-box>
      <el-table border="" style="width: 100%" :data="tableData">
        <el-table-column prop="undefined" label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="30f550a5" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="30f550a5" />
          </template>
        </el-table-column>

        <el-table-column prop="undefined" label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="f550a5fe" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="f550a5fe" />
          </template>
        </el-table-column>

        <el-table-column prop="undefined" label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="50a5fe5a" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="50a5fe5a" />
          </template>
        </el-table-column>

        <el-table-column prop="undefined" label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="a5fe5a94" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="a5fe5a94" />
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
