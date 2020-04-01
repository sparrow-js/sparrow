<template>
  <div class="root">
    <el-table border="" style="width: 100%" :data="tableData">
      <el-table-column prop="undefined" label="sadasd">
        <template slot-scope="{ row, column, $index }"> </template>
      </el-table-column>

      <el-table-column prop="undefined" label="asdasd">
        <template slot-scope="{ row, column, $index }"> </template>
      </el-table-column>

      <el-table-column prop="undefined" label="sadsad">
        <template slot-scope="{ row, column, $index }"> </template>
      </el-table-column>

      <el-table-column prop="undefined" label="asdd">
        <template slot-scope="{ row, column, $index }"> </template>
      </el-table-column>

      <el-table-column prop="undefined" label="sadas">
        <template slot-scope="{ row, column, $index }">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(row, $index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  methods: {
    handleDelete(row, index) {
      this.$notify({
        title: "Success",
        message: "Delete Successfully",
        type: "success",
        duration: 2000
      });
    }
  },

  data() {
    return {
      tableData: [{}]
    };
  }
};
</script>
