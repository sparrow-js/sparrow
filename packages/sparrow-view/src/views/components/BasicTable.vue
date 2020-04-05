<template>
  <div class="root">
    <table-box>
      <el-table border="" style="width: 100%" :data="tableData">
        <el-table-column prop="name" label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="90668839" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="90668839" />
          </template>
        </el-table-column>

        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="6688391b" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="6688391b" />
          </template>
        </el-table-column>

        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="88391bdd" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="88391bdd" />
          </template>
        </el-table-column>

        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="391bdd78" :label="column.label" />
          </template>
          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="391bdd78" />
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
