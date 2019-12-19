<template>
  <div class="blockbox">
    <ul class="blockbox-list">
      <li class="blockbox-item">
        <block-item></block-item>
      </li>
      <li class="blockbox-item">
        <block-item></block-item>
      </li>
      <li class="blockbox-item">
        <block-item></block-item>
      </li>
      <li class="blockbox-item">
        <block-item></block-item>
      </li>
      <li class="blockbox-item">
        <block-item></block-item>
      </li>
      <li class="blockbox-item">
        <block-item></block-item>
      </li>
    </ul>
  </div>
</template>
<script>
import BlockItem from './BlockItem';
export default {
  components: {
    BlockItem
  }
}
</script>
<style lang="scss" scoped>
.blockbox{
  width: 100%;
  height: 100%;
  &-list{
    display: flex;
    flex-wrap: wrap;
    padding: 0;
  }
  &-item{
    color: #fff;
    width: 33%;
    flex-shrink: 0;
    min-height: 200px;
    padding: 10px;
    box-sizing: border-box;
    list-style: none;
  }
}
</style>