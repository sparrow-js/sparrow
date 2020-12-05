export default {
  code: `
  <template>
    <div class="root">
      <table-box>
        <el-table border="" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180" :render-header="renderHeader">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
      </table-box>
    </div>
  </template>

  <script>
  export default {
    data() {
      return {
        list: [
          {},
        ]
      };
    }
  };
  </script>
  `
}