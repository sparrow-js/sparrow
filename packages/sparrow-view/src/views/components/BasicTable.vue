<template>
  <div class="root">
    <table-box>
      <el-table border="" style="width: 100%" :data="tableData">
        <el-table-column prop="undefined" label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="a0ee3f55" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="a0ee3f55" />
          </template>
        </el-table-column>

        <el-table-column prop="undefined" label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="ee3f5538" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="ee3f5538" />
          </template>
        </el-table-column>

        <el-table-column prop="undefined" label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="3f55382e" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="3f55382e" />
          </template>
        </el-table-column>

        <el-table-column prop="undefined" label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="55382ef0" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="55382ef0" />
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
