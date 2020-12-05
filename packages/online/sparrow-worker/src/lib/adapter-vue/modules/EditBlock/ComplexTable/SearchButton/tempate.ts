export default {
  code: `
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
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
  }
}
</script>  
  `
}
