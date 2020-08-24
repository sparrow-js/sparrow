<template>
  <div>
    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
      Search
    </el-button>
  </div>
</template>
<script>
export default {
  methods: {
     createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
  }
}
</script>