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
    cancel (id) {
      const target = this.list.find(item => item.id === id)
      Object.keys(target).forEach(key => { target[key] = target._originalData[key] })
      target._originalData = undefined
    },
  }
}
</script>  
  `
}