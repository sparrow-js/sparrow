<template>
  <div id="app">
    <el-container class="container">
      <el-aside width="160px"></el-aside>
      <el-container>
        <el-main>
          <div class="main">
            <logo></logo>
            <top-toolbar></top-toolbar>
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
      <el-aside width="160px"></el-aside>
    </el-container>
    <div 
      class="dashboard-box"
      v-if="showDashboard"
    >
      <dashboard 
        @on-selected="selectedHandler(data)"
        :tab-index="dashboardTabIndex"
      ></dashboard>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Logo from '@/components/logo.vue';
import Dashboard from '@/components/materiel/Dashboard.vue';
import { AppModule } from '@/store/modules/app';
import socket from '@/util/socket.js';
import TopToolbar from '@/components/TopToolbar.vue';
import Loading  from '@/util/loading';

@Component({
  components: {
    Logo,
    Dashboard,
    TopToolbar
  }
})
export default class App extends Vue {
  private dashboardTabIndex = '0';

  get showDashboard () {
    return AppModule.showDashboard;
  }

  created() {
    window.addEventListener("message", async event => {
      const {data} = event;
      if (!data.handler) return;
      const handlerFirst = data.handler.split('.')[0];
      if (handlerFirst !== 'client') return;
      if (data.handler === 'client.dashboard.show') {
        console.log('insert-data', data);
        AppModule.InsertData(data);
        AppModule.SetShowDashboard(true);
        if (['block'].includes(data.data.type)) {
          this.dashboardTabIndex = '1';
        }
      }
    });

    // block 进度
    socket.on('generator.scene.block.status', (data) => {
      Loading.close();
    });
  }

  private async selectedHandler(data) {
    console.log(data);
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
  
  #app .el-main {
    color: #333;
    text-align: center;
    padding-top: 0;
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
