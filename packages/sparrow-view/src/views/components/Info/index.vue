<template>
  <div class="header-info">
    <span v-if="title">{{ title }}</span>
    <p v-if="content">{{ content }}</p>
    <slot />
    <em v-if="bordered" />
  </div>
</template>

<script>
export default {
  name: 'Info',
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    bordered: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>

.header-info {
  position: relative;
  text-align: center;
  & > span {
    display: inline-block;
    margin-bottom: 4px;
    color: #909399;
    font-size: 14px;
    line-height: 22px;
  }
  & > p {
    margin: 0;
    color: #303133;
    font-size: 24px;
    line-height: 32px;
  }
  & > em {
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 56px;
    background-color: #DCDFE6;
  }
}
</style>
