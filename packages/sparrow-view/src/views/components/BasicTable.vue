<template>
  <div class="root">
    <table-box>
      <el-table border="" style="width: 100%" :data="tableData">
        <el-table-column label="asdasd">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="e6634e13" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="e6634e13" />
          </template>
        </el-table-column>

        <el-table-column label="asdasd">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="634e1301" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="634e1301" />
          </template>
        </el-table-column>

        <el-table-column label="asdasd">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="4e1301c5" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="4e1301c5" />
          </template>
        </el-table-column>

        <el-table-column label="asdasd">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="1301c523" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="1301c523" />
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
