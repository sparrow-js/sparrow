<template>
  <div class="toolbar">
    <div class="toolbar__item toolbar__preview">预览</div>
    <div class="toolbar__item toolbar__export">导出</div>
    <div class="toolbar__item toolbar__export">源代码</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

export default class TopToolbar extends Vue {

}
</script>
<style lang="scss" scoped>
  .toolbar{
    display: flex;
    flex-direction: row;
    margin-left: 10px;
    &__item{
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 6px;
      color: #555;
      font-size: 14px;
      margin-right: 16px;
      &:hover{
        color: #3e71f7;
      }
    }
  }
</style>