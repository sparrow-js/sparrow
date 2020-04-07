<template>
  <div class="root">
    <table-box>
      <el-table border="" style="width: 100%" :data="tableData">
        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="27dd473c" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="27dd473c" />
          </template>
        </el-table-column>

        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="dd473c65" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="dd473c65" />
          </template>
        </el-table-column>

        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="473c65a3" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="473c65a3" />
          </template>
        </el-table-column>

        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="3c65a3fb" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="3c65a3fb" />
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
