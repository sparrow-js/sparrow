<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  data () {
    return {
      activeName: 'second',

      tabsOptions_unique: [
        {
          value: 'first',
          label: '用户管理'
        },
        {
          value: 'second',
          label: '配置管理'
        },
        {
          value: 'third',
          label: '角色管理'
        },
        {
          value: 'fourth',
          label: '定时任务补偿'
        }
      ]
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>
<style lang="scss" scoped>

</style>