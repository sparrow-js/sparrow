<template>
  <div class="component-box">
    <div class="tabs">
      <div @click="tabChange(0)" class="tabs-item">
        组件树
      </div>
      <div @click="tabChange(1)" class="tabs-item">
        组件库
      </div>
    </div>
    <div v-show="activeIndex === 0">
      <el-tree :data="tree" default-expand-all @node-click="handleNodeClick"></el-tree>
    </div>

    <div v-show="activeIndex === 1">
      <component v-if="componentIs" :list="componentList" :is="componentIs"></component>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
import FormBox from './FormBox';
import TableBox from './TableBox';
import CustominlineBox from './CustominlineBox';
import socket from '@/util/socket.js';

@Component({
  components: {
    formBox: FormBox,
    tableBox: TableBox,
    custominlineBox: CustominlineBox
  }
})
export default class CompBox extends Vue {
  private componentList = [];
  private componentMap = {};
  private activeIndex = 1;
  private tree = [];

  get componentIs() {
    if (AppModule.componentIs) {
      return AppModule.componentIs + 'Box';
    } else {
      return '';
    }
    
  }
  @Watch('componentIs', { immediate: true })
  private onjsonDataChange() {
    const { type, params } = this.insertData.data;
    if (type !== 'custominline') {
      this.componentList = this.componentMap[type];
    } else {
      this.componentList = this.componentMap[params.compBox];
    }
  }

  get insertData() {
    return AppModule.insertData;
  }
  async created() {
    const { type, params } = this.insertData.data;
    const componentMap = await socket.emit('generator.data.getCompList');
    this.componentMap = componentMap;
    if (type !== 'custominline') {
      this.componentList = componentMap[type];
    } else {
      this.componentList = componentMap[params.compBox];
    }
  }

  private async getSceneTree () {
    const tree = await socket.emit('generator.scene.getSceneTree');
    this.tree = [tree];
  }

  private tabChange (index) {
    this.activeIndex = index;
    this.getSceneTree();
    console.log('*****');
  }

  private handleNodeClick () {}
}
</script>
<style lang="scss" scoped>
.component-box{
  display: flex;
  flex-direction: row;
}
.tabs{
  margin-right: 5px;
  flex-shrink: 0;
  color: #909399;
}
.tabs-item{
  padding: 5px;
}
</style>