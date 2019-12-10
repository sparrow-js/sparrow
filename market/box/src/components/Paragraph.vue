<template>
  <div class="paragraph">
    <div class="paragraph-edit" contenteditable="true" @focus="focus"></div>
    <div class="operate-box" v-if="false">
      <span>编辑</span>
      <span>删除</span>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  methods: {
    focus () {
      window.console.log('*******8******');
    }
  }
}
</script>
<style lang="scss" scoped>
.paragraph{
  min-height: 48px;
  box-sizing: border-box;
  padding: 5px;
  &-edit{
    width: 100%;
    height: 100%;
    outline: none;
    text-align: left;
  }
}
</style>