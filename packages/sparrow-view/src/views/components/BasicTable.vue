<template>
  <div class="root">
    <table-box>
      <el-table border="" style="width: 100%" :data="tableData">
        <el-table-column label="ID">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="eda383bb" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="eda383bb" />
          </template>
        </el-table-column>

        <el-table-column label="时间">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="a383bb13" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="a383bb13" />
          </template>
        </el-table-column>

        <el-table-column label="标题">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="83bb131f" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="83bb131f" />
          </template>
        </el-table-column>

        <el-table-column label="作者">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="bb131f84" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="bb131f84" />
          </template>
        </el-table-column>

        <el-table-column label="状态">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="131f8478" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="131f8478" />
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="1f84780e" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="1f84780e" />
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
