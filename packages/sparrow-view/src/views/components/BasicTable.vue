<template>
  <div class="root">
    <table-box>
      <el-table border="" style="width: 100%" :data="tableData">
        <el-table-column label="ID">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="2d04875d" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="2d04875d" />
          </template>
        </el-table-column>

        <el-table-column label="时间">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="04875d21" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="04875d21" />
          </template>
        </el-table-column>

        <el-table-column label="标题">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="875d2103" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="875d2103" />
          </template>
        </el-table-column>

        <el-table-column label="作者">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="5d21030e" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="5d21030e" />
          </template>
        </el-table-column>

        <el-table-column label="状态">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="21030e26" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="21030e26" />
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="030e26ab" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="030e26ab" />
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
