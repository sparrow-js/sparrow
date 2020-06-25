<template>
  <div class="component-box">
    <div class="tabs">
      <div 
        @click="tabChange(2)" 
        class="tabs-item"
        :class="{'active': activeTreeIndex === 2}">
        <i class="iconfont icon-suohuicaidan-"></i>
      </div>
      <div 
        @click="tabChange(0)" 
        class="tabs-item"
        :class="{'active': activeTreeIndex === 0}"
      >
        <i class="iconfont icon-tree-table"></i>
      </div>
      <div 
        @click="tabChange(1)" 
        class="tabs-item"
        :class="{'active': activeTreeIndex === 1}"
      >
        <i class="iconfont icon-zujian"></i>
      </div>
    </div>
    <div class="tabs-body" v-show="[0, 1].includes(activeTreeIndex)">
      <div class="tree" v-show="activeTreeIndex === 0">
        <!-- <el-scrollbar style="height:100%"> -->
          <el-tree 
            :data="tree"
            node-key="id"
            :current-node-key="currentNodeKey"
            :highlight-current="true"
            default-expand-all
            draggable
            :allow-drop="allowDrop"
            @node-drop="handleDrop"
            @node-click="handleNodeClick"
            ref="componentTree"
          >

            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span v-if="selectedNode.id && selectedNode.id === data.id">
                <i 
                  class="iconfont icon-delete1"
                  @click="deleteComponent(data.id)"
                ></i>
              </span>
            </span>

          </el-tree>
        <!-- </el-scrollbar> -->
       
      </div>

      <div v-show="activeTreeIndex === 1">
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
import ContainerBox from './ContainerBox';
import EmptyBox from './EmptyBox';
import socket from '@/util/socket.js';

@Component({
  components: {
    formBox: FormBox,
    tableBox: TableBox,
    custominlineBox: CustominlineBox,
    ContainerBox: ContainerBox,
    EmptyBox,
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

  get activeTreeIndex () {
    return AppModule.activeTreeIndex;
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

  @Watch('uuid', {immediate: true })
  private uuidChange () {
    const componentTree:any = this.$refs.componentTree
    componentTree && componentTree.setCurrentKey(this.uuid);
    this.selectedNode = {
      id: this.uuid
    }
  }

  get insertData() {
    return AppModule.insertData;
  }
  get uuid () {
    return AppModule.uuid;
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
    AppModule.setActiveTreeIndex(index)
    this.getSceneTree();
  }

  private handleNodeClick (node) {
    const viewContent:any = document.querySelector('#viewContent');
    viewContent.contentWindow.postMessage({
      handler: 'view.component.selected',
      uuid: node.id
    }, '*');
    this.selectedNode = node;
    AppModule.setUuid(node.id);
  }

  private async deleteComponent (id) {
    await socket.emit('generator.scene.deleteComponent', {
      id,
    });
    this.getSceneTree();
  }

  allowDrop(draggingNode, dropNode, type) {
    if(draggingNode.parent.key === dropNode.parent.key && type !== 'inner') {
      return true;
    } else {
      return false;
    }
  }

  async handleDrop (dragNode, dropNode) {
    const {key, childNodes} = dropNode.parent;
    const order = childNodes.reduce((total, item)  => {total.push(item.key); return total;}, []);
    let node = dropNode;
    while (node.label !== 'box' && node) {
      node = node.parent;
    }

    await socket.emit('generator.scene.changePosition', {
      uuid: node.key,
      order
    });
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

.tree {  
  overflow-y: auto;  
  overflow-x: scroll;  
  /* width: 80px; */  
  height: 500px;  
  background-color: #ffffff;  
}  
.el-tree {  
  min-width: 100%;  
  font-size: 14px;  
  display: inline-block !important;  
}
</style>