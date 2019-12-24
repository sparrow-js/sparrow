<template>
  <div id="app">
    <el-container class="container">
      <el-aside width="200px"></el-aside>
      <el-container>
        <el-main>
          <div class="main">
            <logo></logo>
            <div class="editor-box">
              <iframe
                class="view-content"
                src="http://localhost:9000/"
              />
              <!-- <editor></editor> -->
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
import Editor from '@/components/Editor.vue';
import Dashboard from '@/components/materiel/Dashboard.vue';
import { AppModule } from '@/store/modules/app';
import socket from '@/util/socket.js'

@Component({
  components: {
    Logo,
    Editor,
    Dashboard,
  }
})
export default class App extends Vue {
  created () {
    this.getAllTest();
    this.getProjetList();
  }
  get showDashboard () {
    return AppModule.showDashboard
  }

  async getAllTest () {
    const result = await socket.emit('adapter.page.getTest');
    console.log(result);
  }

  async getProjetList () {
    const result = await socket.emit('home.project.list');
    console.log(result);
  }
}
</script>
<style>
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
</style>  