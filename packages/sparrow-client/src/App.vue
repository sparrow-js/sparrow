<template>
  <div id="app">
    <el-container class="container">
      <el-aside width="200px">
        <comp-box v-if="showComponentBox"></comp-box>
      </el-aside>

      <el-container>
        <el-main>
          <div class="main">
            <top-toolbar></top-toolbar>
            <div class="editor-box">
              <iframe
                id="viewContent"
                ref="viewContent"
                class="view-content"
                src="http://localhost:9000/"
              />
            </div>
          </div>
        </el-main>
      </el-container>

      <el-aside :width="'200px'">
        <setting
          setting-data="settingData"
        ></setting>
      </el-aside>

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
import { Component, Vue, Watch } from 'vue-property-decorator'
import Logo from '@/components/logo.vue';
import Dashboard from '@/components/materiel/Dashboard.vue';
import socket from '@/util/socket.js';
import TopToolbar from '@/components/TopToolbar.vue';
import Loading  from '@/util/loading';
import Setting from '@/components/setting/index.vue';
import { AppModule } from '@/store/modules/app';
import { SettingModule } from '@/store/modules/setting';
import CompBox from '@/components/materiel/CompBox.vue'
@Component({
  components: {
    Logo,
    Dashboard,
    TopToolbar,
    Setting,
    CompBox
  }
})
export default class App extends Vue {
  private dashboardTabIndex = '0';
  private settingData = null;
  private settingWidth = '80px';
  private formIndex = 0;


  get showDashboard () {
    return AppModule.showDashboard;
  }

  get showComponentBox () {
    return AppModule.showComponentBox;
  }

  get showSetting () {
    return SettingModule.showSetting;
  }

  get boxIndex () {
    return AppModule.boxIndex;
  }

  created() {
    window.addEventListener("message", async event => {
      const {data} = event;
      if (!data.handler) return;
      const handlerArr = data.handler.split('.')
      const handlerFirst = handlerArr[0];
      if (handlerFirst === 'client') {
      // 触发区块集
        if (data.handler === 'client.dashboard.show') {
          AppModule.InsertData(data);
          AppModule.SetShowDashboard(true);
        }
        

        // 展示设置  
        if (data.handler === 'client.setting.show') {
          
          const {box, setting} = data;
          SettingModule.setSettingData(setting.data);
          SettingModule.setSettingComponent({
            compName: 'FormSetting', 
            forceRefresh: this.formIndex !== box.index ? true : false
          });
          this.formIndex = box.index;
        }

        // 触发组件集
        if (data.handler === 'client.component.show') {
          AppModule.InsertData(data);
          AppModule.SetShowComponent(true);
        }

        // 插入组件label
        if (data.handler === 'client.component.insertLabel') {
          const params = {
            boxIndex: this.boxIndex,
            data: {
              ...data.data.params,
              handler: 'addLabel'
            }
          };

          const result = await socket.emit('generator.scene.setting', params);
        }

        
        if (data.boxIndex !== undefined) {
          AppModule.SetDoxIndex(data.boxIndex);
        }
      };

      if (handlerFirst === 'forward') {
        const handler = handlerArr.slice(1, handlerArr.length).join('.');

         const params = {
            boxIndex: this.boxIndex,
            data: data.data.params
          };

          const result = await socket.emit('generator.scene.setting', params);
      }
      
    
    });

    // block 进度
    socket.on('generator.scene.block.status', (data) => {
      Loading.close();
    });
    
    this.settingData = {};
  }

  mounted () {
    const viewContent: any = this.$refs.viewContent;
    viewContent.addEventListener('click', (e) => {
      e.stopPropagation();
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
  body{
    padding: 10px;
    box-sizing: border-box;
  }
  #app{
    height: 100%;
  }
  
  .el-aside {
    background-color: #fafaff;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 2px 0px;
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
