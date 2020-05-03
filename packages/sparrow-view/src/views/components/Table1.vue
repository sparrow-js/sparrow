<template>
  <div class="root">
    <table-box>
      <el-table border="" style="width: 100%" :data="tableData">
        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="d3a87972" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="d3a87972" />
          </template>
        </el-table-column>

        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="a879722c" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="a879722c" />
          </template>
        </el-table-column>

        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="79722c4a" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <el-tag :type="'info'" size="small">
              北京
            </el-tag>

            <el-tag :type="'success'" size="small">
              测试
            </el-tag>

            <table-cell-box uuid="79722c4a" />
          </template>
        </el-table-column>

        <el-table-column label="">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="722c4ab7" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <el-button
              size="mini"
              type="success"
              @click="handleEdit(row, $index)"
            >
              编辑
            </el-button>

            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(row, $index)"
            >
              删除
            </el-button>

            <table-cell-box uuid="722c4ab7" />
          </template>
        </el-table-column>
      </el-table>
    </table-box>
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
    },

    handleEdit(row, index) {
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
      tableData: [{}, {}, {}]
    };
  }
};
</script>
