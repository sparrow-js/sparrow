<template>
  <div id="app">
    <el-container class="container">
      <el-aside width="200px">
        <div class="toolbar">
          <div class="toolbar__item toolbar__preview">预览</div>
          <div class="toolbar__item toolbar__export">导出</div>
        </div>
      </el-aside>
      <el-container>
        <el-main>
          <div class="main">
            <logo></logo>
            <div class="editor-box">
              <iframe
                id="viewContent"
                class="view-content"
                src="http://localhost:9000/"
              />
            </div>
          </div>
        </el-main>
      </el-container>
      <el-aside width="200px"></el-aside>
    </el-container>
    <div 
      class="dashboard-box" 
      v-show="showDashboard"
    >
      <dashboard></dashboard>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Logo from '@/components/logo.vue';
import Dashboard from '@/components/materiel/Dashboard.vue';
import { AppModule } from '@/store/modules/app';
import socket from '@/util/socket.js'

@Component({
  components: {
    Logo,
    Dashboard,
  }
})
export default class App extends Vue {
  get showDashboard () {
    return AppModule.showDashboard
  }
}
</script>

<style lang="scss">
  html, body{
    height: 100%;
  }
  #app{
    height: 100%;
  }
  
  .el-aside {
    border: 1px solid #eaeefb;
    background-color: #f2f3f7;
  }
  .el-header{
    border-bottom: 1px solid #eaeefb;
  }
  
  .el-main {
    color: #333;
    text-align: center;
  }
  .container{
    height: 100%;
  }
  .main{
    text-align: left;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .editor-box{
    border-top: 1px solid #eee;
    flex: 1;
  }
  .dashboard-box{
    position: fixed;
    left: 50%;
    top: 50%;
    width: 60vw;
    transform: translate(-50%, -50%);
  }
  .view-content{
    width: 100%;
    height: 100%;
    border: none;
  }
  .toolbar{
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    padding-top: 60px;
    &__item{
      width: 80px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 6px;
      background: #409eff;
      color: #fff;
      font-size: 15px;
      &:hover{
        background: #53a7fd;
      }
    }
  }
</style>  
