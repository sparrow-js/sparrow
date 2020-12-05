export default {
  code: `
<template>
  <div>
    <el-button type="primary" @click="dialogVisibleHandler_unique">主要按钮</el-button>
    <div class="comp-box">
      <el-dialog title="收货地址" :visible.sync="dialogVisible">
        <div class="dialog-home">
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogVisible: false
    };
  },
  methods: {
    dialogVisibleHandler_unique () {
      this.dialogVisible = !this.dialogVisible;
    }
  }
}
</script>
  `
}