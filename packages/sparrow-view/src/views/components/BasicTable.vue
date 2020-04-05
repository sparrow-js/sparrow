<template>
  <div class="root">
    <table-box>
      <el-table border="" style="width: 100%" :data="tableData">
        <el-table-column prop="undefined" label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="6ca4214f" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="6ca4214f" />
          </template>
        </el-table-column>

        <el-table-column prop="undefined" label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="a4214fc6" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="a4214fc6" />
          </template>
        </el-table-column>

        <el-table-column prop="undefined" label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="214fc634" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="214fc634" />
          </template>
        </el-table-column>

        <el-table-column prop="undefined" label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="4fc63409" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="4fc63409" />
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
