<template>
  <div class="root">
    <table-box>
      <el-table border="" style="width: 100%" :data="tableData">
        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="98a9666b" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="98a9666b" />
          </template>
        </el-table-column>

        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="a9666b75" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <el-tag :type="'success'" size="small">
              easa
            </el-tag>

            <table-cell-box uuid="a9666b75" />
          </template>
        </el-table-column>

        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="666b7532" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="666b7532" />
          </template>
        </el-table-column>

        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="6b753291" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="6b753291" />
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
