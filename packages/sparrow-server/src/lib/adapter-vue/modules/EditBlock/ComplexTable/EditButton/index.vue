<template>
  <div>
    <el-button type="primary" size="mini" @click="handleUpdate(row)">
      Edit
    </el-button>
  </div>
</template>
<script>
export default {
  methods: {
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
  }
}
</script>