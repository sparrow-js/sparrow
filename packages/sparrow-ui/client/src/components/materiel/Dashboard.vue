<template>
  <div class="dashboard">
    <div class="dashboard-tab">
      <el-tabs class="tab" v-model="activeName" @tab-click="handleTab">
        <el-tab-pane label="组件" name="first"></el-tab-pane>
        <el-tab-pane label="区块" name="second"></el-tab-pane>
        <el-tab-pane label="模版" name="third"></el-tab-pane>
        <el-tab-pane label="场景" name="fourth"></el-tab-pane>
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
        <el-aside width="200px" class="dashboard-side">
          <sidebar></sidebar>
        </el-aside>
        <el-container>
          <el-main>
            <div class="dashboard-blocks">
              <block-box></block-box>
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
import { Component, Vue } from 'vue-property-decorator';
import Sidebar from './Sidebar.vue';
import BlockBox from './BlockBox.vue';
import { AppModule } from '@/store/modules/app'

@Component({
  components: {
    Sidebar,
    BlockBox
  }
})

export default class Dashboard extends Vue {
  activeName = 'first';
  searchText = '';
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