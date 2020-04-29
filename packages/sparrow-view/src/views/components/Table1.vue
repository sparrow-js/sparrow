<template>
  <div class="root">
    <table-box>
      <el-table border="" style="width: 100%" :data="tableData">
        <el-table-column label="asdas">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="4e87f3fc" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="4e87f3fc" />
          </template>
        </el-table-column>

        <el-table-column label="asdas">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="87f3fc87" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="87f3fc87" />
          </template>
        </el-table-column>

        <el-table-column label="sad">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="f3fc8726" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <table-cell-box uuid="f3fc8726" />
          </template>
        </el-table-column>

        <el-table-column label="asd">
          <template slot="header" slot-scope="{ row, column, $index }">
            <table-header-box uuid="fc872601" :label="column.label" />
          </template>

          <template slot-scope="{ row, column, $index }">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(row, $index)"
            >
              删除
            </el-button>

            <table-cell-box uuid="fc872601" />
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
    }
  },

  data() {
    return {
      tableData: [{}, {}, {}]
    };
  }
};
</script>
