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
    toggle (id) {
      const target = this.list.find(item => item.id === id)
      target._originalData = { ...target };
      target.editable = !target.editable
    },
  }
}
</script>