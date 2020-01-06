<template>
  <div class="sidebar">
    <el-menu
      default-active="1-5"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#23232e"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item index="1-5">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
        <el-menu-item index="1-3">选项3</el-menu-item>
        <el-menu-item index="1-4-1">选项4</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  methods: {
      handleOpen(key, keyPath) {},
      handleClose(key, keyPath) {}
    }
}
</script>
<style lang="scss" scoped>
.sidebar{
  & /deep/ .el-menu{
    border: 0;
  }
  & /deep/ .el-menu-item:focus{
    background-color: #000 !important;
  }
  & /deep/ .el-menu-item:hover{
    background-color: #000 !important;
  }
} 
</style>