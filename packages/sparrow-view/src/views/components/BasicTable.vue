<template>
  <div class="root">
    <table-box>
      <el-table border="" style="width: 100%" :data="tableData">
        <el-table-column prop="undefined" label="sadasd">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="df94c996" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="df94c996" />
          </template>
        </el-table-column>

        <el-table-column prop="undefined" label="asdasd">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="94c99613" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="94c99613" />
          </template>
        </el-table-column>

        <el-table-column prop="undefined" label="asdasd">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="c99613a4" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="c99613a4" />
          </template>
        </el-table-column>

        <el-table-column prop="undefined" label="asdasd">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="9613a495" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="9613a495" />
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
