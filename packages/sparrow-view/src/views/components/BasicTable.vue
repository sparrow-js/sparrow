<template>
  <div class="root">
    <table-box>
      <el-table border="" style="width: 100%" :data="tableData">
        <el-table-column prop="undefined" label="名字">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="97ec42b6" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="97ec42b6" />
          </template>
        </el-table-column>

        <el-table-column prop="undefined" label="类型">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="ec42b605" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="ec42b605" />
          </template>
        </el-table-column>

        <el-table-column prop="undefined" label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="42b605e4" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="42b605e4" />
          </template>
        </el-table-column>

        <el-table-column prop="undefined" label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="b605e44c" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="b605e44c" />
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
