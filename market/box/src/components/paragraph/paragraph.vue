<template>
  <div class="paragraph">
    <div class="paragraph-edit" contenteditable="true"></div>
    <div class="operate-box" v-if="false">
      <span>编辑</span>
      <span>删除</span>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import Event from '../../utils/Event'
export default {
  methods: {
    focus () {}
  }
}
</script>
<style lang="scss" scoped>
.paragraph{
  height: 48px;
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