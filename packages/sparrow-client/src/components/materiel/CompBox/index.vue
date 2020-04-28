<template>
  <div class="component-box">
    <div class="tabs">
      <div 
        @click="tabChange(2)" 
        class="tabs-item"
        :class="{'active': activeIndex === 2}">
        <i class="iconfont icon-suohuicaidan-"></i>
      </div>
      <div 
        @click="tabChange(0)" 
        class="tabs-item"
        :class="{'active': activeIndex === 0}"
      >
        <i class="iconfont icon-tree-table"></i>
      </div>
      <div 
        @click="tabChange(1)" 
        class="tabs-item"
        :class="{'active': activeIndex === 1}"
      >
        <i class="iconfont icon-zujian"></i>
      </div>
    </div>
    <div class="tabs-body" v-show="[0, 1].includes(activeIndex)">
      <div v-show="activeIndex === 0">
        <el-tree 
          :data="tree"
          :node-key="'id'"
          :current-node-key="currentNodeKey"
          :highlight-current="true"
          default-expand-all 
          @node-click="handleNodeClick"
          ref="componentTree"
        >

          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span v-if="selectedNode.id && selectedNode.id === data.id">
              <i class="iconfont icon-delete1"></i>
            </span>
          </span>

        </el-tree>
      </div>

      <div v-show="activeIndex === 1">
        <component v-if="componentIs" :list="componentList" :is="componentIs"></component>
      </div>
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
  private activeIndex = 2;
  private tree = [];
  private selectedNode = {};
  private currentNodeKey = '';

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

    setTimeout(() => {
      const componentTree:any = this.$refs.componentTree
      componentTree.setCurrentKey('4fd43951')
      this.selectedNode = {
        id: '4fd43951'
      }
    }, 5000)
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

  private handleNodeClick (node) {
    this.selectedNode = node;
    console.log(node);
  }
}
</script>
<style lang="scss" scoped>
.component-box{
  display: flex;
  flex-direction: row;
  height: 100%;
}
.tabs{
  margin-right: 5px;
  flex-shrink: 0;
  color: #909399;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  padding-top: 20px;
}
.tabs-item{
  padding: 10px;
  .iconfont{
    font-size: 20px;
  }
}
.active.tabs-item{
  background-color: #f0f9eb;
}
.active .iconfont{
    color: #67C23A
  }
.tabs-body{
  height: 100%;
  overflow: scroll;
  width: 100%;
  width: 200px;
  border-right: 1px solid #DCDFE6;
}
.icon-add{
  color: #409EFF;
  margin-left: 10px;
}
.icon-delete1{
  color: #F56C6C;
  margin-left: 10px;
}
</style>