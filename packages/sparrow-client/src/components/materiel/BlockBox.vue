<template>
  <div class="blockbox">
    <ul class="blockbox-list">
      <li class="blockbox-item" v-for="item in list" :key="item.key">
        <block-item :info="item" :type="type"></block-item>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import BlockItem from './BlockItem.vue';

@Component({
  components: {
    BlockItem
  }
})
export default class BlockBox extends Vue {
  @Prop({ default: () => [] }) private list: any;
  @Prop() private type: string;
}
</script>
<style lang="scss" scoped>
.blockbox {
  width: 100%;
  height: 100%;
  &-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
  }
  &-item {
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
