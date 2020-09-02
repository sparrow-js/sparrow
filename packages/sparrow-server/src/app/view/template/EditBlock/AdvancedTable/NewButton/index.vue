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
    newMember () {
      const item = Object.assign(this.tableItem, {
        editable: true,
        isNew: true
      });

      this.list.push(item)
    },
  }
}
</script>