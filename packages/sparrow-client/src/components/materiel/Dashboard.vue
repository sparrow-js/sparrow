<template>
  <div class="dashboard">
    <div class="dashboard-tab">
      <el-tabs class="tab" v-model.number="activeName" @tab-click="handleTab">
        <el-tab-pane 
          v-for="tabItem in tabsMap" 
          :key="tabItem.id"
          :label="tabItem.title"
          :name="tabItem.id"
        ></el-tab-pane>
      </el-tabs>
      <div class="dashboard-tab__operate--right">
        <el-input
          placeholder="请输入内容"
          v-model="searchText"
          class="dashboard-search"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
    </div>
    <el-container>
      <el-container>

        <!-- <el-aside width="200px" class="dashboard-side">
          <sidebar></sidebar>
        </el-aside> -->

        <el-container>
          <el-main>
            <div class="dashboard-blocks">
              <block-box :list="list" :type="activeName"></block-box>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
    <div class="dashboard-close" @click="handleClose">
      <i class="el-icon-error dashboard-close__icon"></i>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Sidebar from './Sidebar.vue';
import BlockBox from './BlockBox.vue';
import { AppModule } from '@/store/modules/app';
import socket from '@/util/socket.js';

const materielData = {};
const tabsMap = [
  {
    title: '组件',
    value: 0,
  },
  {
    title: '区块',
    value: 1,
  },
  {
    title: '场景',
    value: 2,
  },
];

@Component({
  components: {
    Sidebar,
    BlockBox
  }
})
export default class Dashboard extends Vue {
  // show
  @Prop({ default: '0' }) private tabIndex : string;


  private activeName = this.tabIndex || '0';
  private searchText = '';
  private tabsMap = tabsMap;

  private list = [];
  
  async created() {
    const result = await socket.emit('generator.data.getComponentList');
    const {list} = result;
    materielData[0] = list;
    const blockList = await socket.emit('material.index.getBlocks');
    materielData[1] = blockList.list;
    this.list = materielData[this.activeName];
  }

  private handleTab () {
    
  }

  private handleClose () {
    AppModule.SetShowDashboard(false)
  }

}
</script>
<style lang="scss" scoped>
.dashboard{
  background:#23232e;
  &-header{
    border-bottom: 1px solid #000;
  }
  &-side{
    background:#23232e;
    border-top: 0px solid #000;
    border-right: 1px solid #000;
    border-left: 0;
    border-bottom: 0;
  }
  &-tab{
    position: relative;
  }
  &-tab__operate--right{
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);

  }
  &-search /deep/ .el-input__inner{
    background-color: #23232e;
    color: #fff;
  }
  &-blocks{
    height: 65vh;
  }
  &-close{
    position: absolute;
    right: -10px;
    top: -10px;
    font-size: 20px;
    color: #ccc;    
  }
  &-close__icon{
    background-color: #000;
    border-radius: 100px;
  }
}
.tab{
  & /deep/ .el-tabs__item{
    color: hsla(0,0%,100%,.65);
    font-size: 16px;
    font-weight: 300;
    height: 60px;
    line-height: 60px;
  }
  & /deep/ .el-tabs__nav{
    margin-left: 20px;
  }
  & /deep/ .el-tabs__header{
    margin: 0;
  }
  & /deep/ .el-tabs__nav-wrap::after{
    background-color: #000;
  }
  & /deep/ .el-tabs__item.is-active{
    color: #409EFF;
  }
}
</style>