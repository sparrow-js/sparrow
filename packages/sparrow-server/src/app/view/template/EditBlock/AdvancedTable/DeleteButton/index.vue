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
    remove (id) {
      const newData = this.list.filter(item => item.id !== id)
      this.list = newData
    },
  }
}
</script>