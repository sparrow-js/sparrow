<template>
  <div class="root">
    <el-table border="" style="width: 100%" :data="tableData">
      <el-table-column prop="undefined" label="ID">
        <template slot-scope="{ row, column, $index }"> </template>
      </el-table-column>

      <el-table-column prop="undefined" label="地址">
        <template slot-scope="{ row, column, $index }"> </template>
      </el-table-column>

      <el-table-column prop="undefined" label="名称">
        <template slot-scope="{ row, column, $index }"> </template>
      </el-table-column>

      <el-table-column prop="undefined" label="操作">
        <template slot-scope="{ row, column, $index }"> </template>
      </el-table-column>
    </el-table>
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
