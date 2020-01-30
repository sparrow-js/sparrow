<template>
  <div class="toolbar">
    <div class="toolbar__item toolbar__preview">
      <el-tooltip class="item" effect="dark" content="预览" placement="top">
        <font-awesome-icon :icon="['fas', 'eye']" />
      </el-tooltip>
    </div>
    <div class="toolbar__item toolbar__export">
      <el-tooltip class="item" effect="dark" content="导出" placement="top">
        <font-awesome-icon :icon="['fas', 'file-export']" />
      </el-tooltip>
    </div>
    <div class="toolbar__item toolbar__export">
      <el-tooltip class="item" effect="dark" content="源代码" placement="top">
        <font-awesome-icon :icon="['fas', 'code']" />
      </el-tooltip>
    </div>
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