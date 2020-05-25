<template>
<div class="array-list">
  <div class="array-item" v-for="(item, index) in list" :key="index">
    <div class="array-item__header">
      <div class="array-item__index">
        <span>{{index + 1}}</span>
        <div contenteditable="true" class="array-item__label"></div>
      </div>
      <div>
        <i class="el-icon-delete" @click="deleteItem(index)"></i>
        <i class="el-icon-arrow-down" @click="moveItem('down', index)"></i>
        <i class="el-icon-arrow-up" @click="moveItem('up', index)"></i>
      </div>
    </div>
    <div class="array-item__content">
      <slot name="item" :item="item"></slot>
    </div>
    <div class="array-item__footer" @click="addItem">
      <div>
        <i class="el-icon-plus"></i>
      </div>
    </div>
  </div>
</div>

</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default () { return [{}]; }
    },
    default: {
      type: Object,
      default () { return {}; }
    }
  },
  methods: {
    addItem () {
      this.list.push(this.default);
    },
    moveItem (direction, index) {
      const curItem = this.list[index];
      if (direction === 'up') {
        if (this.list[index - 1]) {
          this.list[index] = this.list[index - 1];
          this.list[index - 1] = curItem;
        }
      } else {
        if (this.list[index + 1]) {
          this.list[index] = this.list[index + 1];
          this.list[index + 1] = curItem;
        }
      }
    },
    deleteItem (index) {
      if (this.list.length > 1) {
        this.list.splice(index, 1);
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.array-list{
  margin-top: 10px;
}
.array-item{
  border: 1px solid #ebeef5;
  margin-bottom: 10px;
  &__header{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ebeef5;
  }
  &__content{
    padding: 10px;
  }
  &__footer{
    display: flex;
    justify-content: center;
    padding: 10px;
    border-top: 1px solid #ebeef5;
  }
  &__index{
    display: flex;
    flex-direction: row;
  }
  &__label{
    width: 200px;
  }
}
</style>