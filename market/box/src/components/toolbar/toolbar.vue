<template>
  <div 
    class="toolbar" 
    ref="toolbar" 
    :style="styles" 
    v-show="showToolbar"
  >
    <div class="toolbar__box-add">
      <span 
        class="el-icon-plus toolbar__add-icon"
        @click="openBoxTool"
      ></span>
    </div>
    <div class="toolbar__box" v-show="showBoxTool">
      <ul class="toolbar__box-list">
        <li class="toolbar__box-item">文本</li>
        <li class="toolbar__box-item">搜索</li>
        <li class="toolbar__box-item">布局</li>
        <li class="toolbar__box-item">list</li>
      </ul>
    </div>
    <div 
      class="toolbar__actions"
      :style="actionsStyles"
    >
      <span 
        class="el-icon-more toolbar__actions-icon"       
        @click="handlerActions"
      ></span>
      <div class="toolbar__actions-box" v-show="showActions">
        <span class="el-icon-bottom toolbar__actions-button"></span>
        <span class="el-icon-top toolbar__actions-button"></span>
        <span class="el-icon-close toolbar__actions-button"></span>
      </div>
    </div>
  </div>
</template>
<script>
import Event from '../../utils/Event'

export default {
  data () {
    return {
      showToolbar: false,
      showBoxTool: false,
      showActions: false,
      styles: {
        transform: 'translate3d(0, 0, 0)'
      },
      actionsStyles: {
        transform: 'translate3d(100px, 0px, 0)'
      }
    };
  },
  created () {
    Event.on('toolbar-show-position', this.handlerShowPosition)
  },
  methods: {
    openBoxTool () {
      this.showBoxTool = !this.showBoxTool;
    },
    handlerShowPosition (data) {
      const {rect} = data;
      this.showToolbar = true;
      this.styles.transform = `translate3d(${rect.left}px, ${rect.top + 10}px, 0)`;
      this.actionsStyles.transform = `translate3d(${rect.width - 30}px, 0px, 0)`;
      this.showBoxTool = false;
      this.showActions = false;
    },
    handlerActions () {
      this.showActions = !this.showActions;
    }
  }
}
</script>
<style lang="scss" scoped>
.toolbar{
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  &__box-add{
    font-size: 20px;
    position: absolute;
    left: 0;
    top: 6px;
    :hover{
      color: #0f2af3;
      font-weight: bold;
    }
  }
  &__box{
    display: flex;
    position: absolute;
    min-width: 200px;
    left: 36px;
    top: -5px;
    background: #fff;
  }
  &__box-list{
    list-style: none;
    display: flex;
    padding: 6px 10px;
    border: 1px solid #EEE;
    border-radius: 4px;
  }
  &__box-item{
    font-size: 14px;
    margin-right: 8px;
    color: #999;
    &:hover{
      font-weight: bold;
      color: #5668f3;
    }
  }
  &__actions{
    width: 30px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
  }
  &__actions-icon{
    color: #666;
    font-size: 18px;
    font-weight: bold;
    &:hover{
      color: #5668f3;
    }
  }
  &__actions-box{
    display: flex;
    flex-shrink: 0;
    position: absolute;
    top: 30px;
    right: 0;
    border: 1px solid #ccc;
    padding: 4px;
    border-radius: 4px;
    background: #fff;
  }
  &__actions-button{
    flex: 1;
    font-size: 16px;
    font-weight: bold;
    width: 30px;
    height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    text-align: center;
    &:hover{
      background: #EEE;
      border-radius: 4px;
    }
  }
}
</style>