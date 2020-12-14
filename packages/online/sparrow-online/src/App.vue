<template>
  <div id="app">
    <el-container class="container">
      <el-header height="45px">
        <top-toolbar></top-toolbar>
      </el-header>

      <el-container style="height: calc(100% - 55px);">
        <div>
          <comp-box></comp-box>
        </div>
        <el-main>
          <div class="main">
            <div class="editor-box">
              <iframe
                id="viewContent"
                ref="viewContent"
                class="view-content"
                src="http://192.168.199.156:3000/view"
              />
            </div>
          </div>
        </el-main>
        <div>
          <setting setting-data="settingData"></setting>
        </div>
      </el-container>
    </el-container>
    <div class="dashboard-box" v-if="showDashboard">
      <dashboard
        @on-selected="selectedHandler(data)"
        :tab-index="dashboardTabIndex"
      ></dashboard>
    </div>
    <worker-iframe />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Logo from '@/components/logo.vue';
import Dashboard from '@/components/materiel/Dashboard.vue';
import TopToolbar from '@/components/TopToolbar.vue';
import Loading from '@/util/loading';
import Setting from '@/components/setting/index.vue';
import { AppModule } from '@/store/modules/app';
import { SettingModule } from '@/store/modules/setting';
import CompBox from '@/components/materiel/CompBox/index.vue';
import JsonEditor from '@/components/JsonEditor/index.vue';
import WorkerIframe from '@/components/WorkerIframe/index.vue';
import _ from 'lodash';
import Message from '@/util/MessageWorker';
@Component({
  components: {
    Logo,
    Dashboard,
    TopToolbar,
    Setting,
    CompBox,
    JsonEditor,
    WorkerIframe,
  }
})
export default class App extends Vue {
  private dashboardTabIndex = '0';
  private settingData = null;
  private settingWidth = '80px';
  private formIndex = 0;
  private isCompPast = true;

  get showDashboard() {
    return AppModule.showDashboard;
  }

  get showComponentBox() {
    return AppModule.showComponentBox;
  }

  get boxUuid() {
    return AppModule.boxUuid;
  }

  async created() {
    // await socket.emit('home.index.init');

    // window.onunload = async e => {
    //   await socket.emit('generator.scene.refresh');
    // };

    Message.on('client.dispatch.component', (data) => {
       setTimeout(() => {
        if (data.uuid !== undefined) {
          AppModule.setBoxUuid(data.uuid);
        }
      }, 200);
    })

    Message.on('client.dispatch.box', (data) => {
      setTimeout(() => {
        if (data.uuid !== undefined) {
          AppModule.setBoxUuid(data.uuid);
        }
      }, 200);
    })


    window.addEventListener('message', async event => {
      const { data } = event;
      if (!data.handler) return;
      console.log(data);
      const handlerArr = data.handler.split('.');
      const handlerFirst = handlerArr[0];
      if (handlerFirst === 'client') {
        // 插入组件label
        if (data.handler === 'client.component.insertLabel') {
          const params = {
            data: {
              ...data.data.params,
            }
          };
          const result = await Message.emit('generator.scene.insertLabel', params);
        }

        // 同步编辑文本文案
        if (data.handler === 'client.component.insertEditText') {
          const { params } = data.data;
          await Message.emit('generator.scene.insertEditText', params);
        }

        if (data.handler === 'client.screen.keydown') {
          const {operate} = data;
          if (operate === 'ctrl+c') {
            this.isCompPast = true;
            this.copyHandler();
          } else if (operate === 'ctrl+v') {
            setTimeout(() => {
              if (this.isCompPast) {
                this.pasteHandler();
              }
            }, 500);
          } else if (operate === 'delete') {
            this.deleteComp();
          }

        }

        if (data.handler === 'client.component.paste') {
          this.isCompPast = false;
        }

        // 延迟同步uuid
        setTimeout(() => {
          if (data.uuid !== undefined) {
            AppModule.setBoxUuid(data.uuid);
          }
        }, 200);
      }
    });

    // block 进度
    Message.on('generator.scene.block.status', data => {
      Loading.close();
    });

    Message.on('generator.plugin.status', data => {
      Loading.close();
    });

    Message.on('generator.force.refresh',data => {
      const viewContent:any = document.querySelector('#viewContent')
      setTimeout(() => {
        viewContent.contentWindow.location.reload(true)
      }, 500)
    });

   

    // generate-file

    this.settingData = {};
  }

  mounted() {
    const viewContent: any = this.$refs.viewContent;
    viewContent.addEventListener('click', e => {
      e.stopPropagation();
    });
    // Message.emit('sparrow-test', {id: 1});
  }

  private async pasteHandler () {
    // pasteHandler
    const result = await Message.emit('generator.scene.pasteHandler', {
      compId: this.boxUuid,
    });
  }

  private async deleteComp () {
    await Message.emit('generator.scene.deleteComponent', {
      id: AppModule.activeCompId
    });
  }

  private async copyHandler () {
    const result = await Message.emit('generator.scene.copyHandler', {
      activeCompId: AppModule.activeCompId
    });
    this.$message({
      message: '复制成功',
      type: 'success'
    });
  }

  private async selectedHandler(data) {}
}
</script>

<style lang="scss">
html,
body {
  height: 100%;
}
body {
  padding: 0;
  box-sizing: border-box;
  background: #fff;
}
#app {
  height: 100%;
}

.el-aside {
  background-color: #fafaff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 2px 0px;
}
.el-header {
  border-bottom: 1px solid #eaeefb;
}

#app .el-main {
  color: #333;
  text-align: center;
  padding: 0;
}
.container {
  height: 100%;
}
.main {
  text-align: left;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.editor-box {
  border-top: 1px solid #eee;
  flex: 1;
}
.dashboard-box {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 60vw;
  transform: translate(-50%, -50%);
}
.view-content {
  width: 100%;
  height: 100%;
  border: none;
}
.ali-icon {
  width: 1.125em;
  display: inline-block;
  font-size: inherit;
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.is-drop-inner>.el-tree-node__content .custom-tree-node{
  background: #409EFF;
}
.drag-class{
  display: none;
}
</style>
