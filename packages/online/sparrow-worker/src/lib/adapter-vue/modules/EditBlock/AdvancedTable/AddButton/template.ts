export default {
  code: `
<template>
  <div>
    <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
      新增
    </el-button>
  </div>
</template>
<script>
export default {
  methods: {
    saveRow (row) {
      this.listLoading = true
      const {id, title } = row
      if (!title) {
        this.listLoading = false
        this.$message.error('请填写完整成员信息。')
        return
      }
      // 模拟网络请求、卡顿 800ms
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({ loop: false })
        }, 800)
      }).then(() => {
        const target = this.list.find(item => item.id === id)
        target.editable = false
        target.isNew = false
        this.listLoading = false
      })
    },
  }
}
</script>
  `
}