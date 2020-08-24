<template>
  <div>
    <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">
      Publish
    </el-button>
  </div>
</template>
<script>
export default {
  methods: {
      handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
  }
}
</script>