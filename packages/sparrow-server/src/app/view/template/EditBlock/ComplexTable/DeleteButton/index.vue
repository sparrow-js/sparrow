<template>
  <div>
    <el-button type="primary" size="mini" @click="handleDelete(row)">
      delete
    </el-button>
  </div>
</template>
<script>
export default {
  methods: {
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
  }
}
</script>