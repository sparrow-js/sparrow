<template>
  <div class="component-box">
    <div class="tabs">
      <div
        @click="tabChange(2)"
        class="tabs-item"
        :class="{ active: activeTreeIndex === 2 }"
      >
        <i class="iconfont icon-suohuicaidan-"></i>
      </div>
      <div
        @click="tabChange(0)"
        class="tabs-item"
        :class="{ active: activeTreeIndex === 0 }"
      >
        <i class="iconfont icon-tree-table"></i>
      </div>
      <div
        @click="tabChange(3)"
        class="tabs-item"
        :class="{ active: activeTreeIndex === 3 }"
      >
        <i class="iconfont icon-changjing"></i>
      </div>

      <div
        @click="tabChange(4)"
        class="tabs-item"
        :class="{ active: activeTreeIndex === 4 }"
      >
        <i class="iconfont icon-data"></i>
      </div>

      <div
        @click="tabChange(5)"
        class="tabs-item"
        :class="{ active: activeTreeIndex === 5 }"
      >
        <i class="el-icon el-icon-search"></i>
      </div>

      <div
        @click="tabChange(6)"
        class="tabs-item"
        :class="{ active: activeTreeIndex === 6 }"
      >
        <i class="iconfont icon-chajian"></i>
      </div>
    </div>
    <div class="tabs-body" v-show="[0, 3, 4, 5, 6].includes(activeTreeIndex)">
      <div class="tree" v-show="activeTreeIndex === 0">
        <el-tree
          :data="tree"
          node-key="id"
          :current-node-key="currentNodeKey"
          :highlight-current="true"
          default-expand-all
          @node-click="handleNodeClick"
          ref="componentTree"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <div class="tree-tool" v-if="selectedNode.id && selectedNode.id === data.id">
              <span>
                <i
                  class="iconfont icon-delete1 icon-delete-comp"
                  @click="deleteComponent(data.id)"
                ></i>
              </span>
              <span class="icon-plus" v-if="data.label === 'column'">
                <i
                  class="el-icon-circle-plus"
                  @click="addTableColumn(data.id, node)"
                ></i>
              </span>
            </div>
          </span>
        </el-tree>
      </div>

      <div v-show="activeTreeIndex === 3">
        <div class="scene-list">
          <div class="scene-item" v-for="item in sceneList" :key="item.name">
            <div>
              <el-card>
                <div
                  :style="{ 'background-image': `url(${item.url})` }"
                  class="scene__preview"
                ></div>
              </el-card>
              <div class="scene-item__name">
                <span class="scene-item__title">{{ item.name }}</span>
              </div>
            </div>
            <div class="scene__operate">
              <div style="margin-bottom: 4px;">
                <el-button
                  type="primary"
                  style="margin-right: 10px"
                  size="mini"
                  @click="useScene(item.id)"
                  >
                  <i class="iconfont icon-shiyongxuzhi" />
                  <span>使用</span></el-button
                >
                <el-popconfirm
                  title="确定删除吗？"
                  @onConfirm="deleteScene(item.id)"
                >
                  <el-button slot="reference" type="danger" size="mini"
                    ><i class="iconfont icon-delete1 icon-delete-tree" /><span>删除</span></el-button
                  >
                </el-popconfirm>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-show="activeTreeIndex === 4">
        <div class="file-item"
          v-for="item in fileList"
          :key="item.uuid"
          @click="openToolDialog(item)"
        >
          {{ item.fileName }}
          <div>
            <i @click.stop="openDrawerHandler(item)" class="iconfont icon-data"></i>
          </div>
        </div>
        <!-- <div class="file-box">
          <div class="codemirror-operate">
            <span class="update-data" @click.stop="updateCodeData">更新</span>
          </div>
          <el-tabs v-model="activeNameCode" @tab-click="handleCodeClick">
            <el-tab-pane label="code" name="code">
              <codemirror ref="codemirror" v-model="dataCode"></codemirror>
            </el-tab-pane>
            <el-tab-pane label="json" name="json">
              <json-handler :json-data="jsonData"></json-handler>
            </el-tab-pane>
          </el-tabs>
        </div> -->
      </div>

      <div class="tab-content" v-show="activeTreeIndex === 5">
        <div class="custom-comp-box">
          <div class="toolbar-search">
            <el-input
              placeholder="搜索组件"
              v-model="search"
              @input="searchChange"
            >
              <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <div class="comp-box">
            <div class="comp-list">
              <div
                class="comp-item"
                v-for="(item, index) in customCompList"
                :key="index"
                @click="addComponent(item)"
                @mousedown="mousedownWidget(item)"
              >
                <div class="drag-box">
                  <div class="drag-box-item"  v-if="item.thumb">
                    <img :src="item.thumb" class="thumb-img">
                  </div>
                  <div>
                    <div class="comp-item__title">{{ item.label }}</div>
                    <div class="comp-item__des">{{ item.des }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="tab-content" v-show="activeTreeIndex === 6">
        <div class="plugin-box">
          <el-radio-group v-model="installType" size="mini">
            <el-radio :label="1">npm</el-radio>
            <el-radio :label="2">本地</el-radio>
          </el-radio-group>
        </div>
        <div class="plugin-box">
          <el-input
            v-model="packageName"
            :placeholder="installType === 1 ? '输入包名' : '输入路径'"
            size="small"
          ></el-input>
          <el-button
            style="margin-left: 5px"
            type="primary"
            size="small"
            @click="installPlugin"
            >安装</el-button
          >
        </div>
        <div class="plugin-list">
          <div
            class="plugin-item"
            v-for="item in pluginList"
            :key="item.key"
            @click="addComponent(item)"
            @mousedown="mousedownWidget(item)"
          >
            <el-card class="box-card" shadow="hover" :body-style="{}">
              <div class="card-content">
                <div
                  class="drag-box"
                  style="display: flex;flex-direction: row;align-items: center;"
                >
                  <el-image
                    :src="item.thumb"
                    style="height: 64px;width:64px;flex-shrink: 0;"
                    :lazy="false"
                  >
                  </el-image>
                  <div
                    class="drag-box"
                    style="display: block;flex-direction: column;margin-left:8px;"
                  >
                    <h4 class="s-typography">
                      {{ item.name }}
                    </h4>
                    <p class="s-typography">
                      {{ item.description }}
                    </p>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="toolVisible">
      <div>
        <tool-box v-if="toolVisible" />
      </div>
    </el-dialog>

    <el-drawer
      title="我是标题"
      :visible.sync="openDrawer"
      :modal="false"
      class="custom-drawer"
      :direction="'ltr'"
      :size="'320px'"
      :wrapperClosable="false">
      <json-handler :json-data="jsonData"></json-handler>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
import socket from '@/util/socket.js';
import JsonHandler from '@/components/jsonhandler/index.vue';
import _ from 'lodash';
import Loading from '@/util/loading';
import ToolBox from './ToolBox.vue';

@Component({
  components: {
    JsonHandler,
    ToolBox
  }
})
export default class CompBox extends Vue {
  private componentList = [];
  private componentMap = {};
  private activeIndex = 2;
  private tree = [];
  private selectedNode = {};
  private currentNodeKey = '';
  private sceneList = [];
  private dataCode = `var data = {}`;
  private jsonData = '"{}"';
  private activeNameCode = 'code';
  private search = '';
  private customCompList = [];
  private widgetData = null;
  private fileList = [];
  private toolVisible = false;
  private openDrawer = false;
  private packageName = '';
  private pluginList = [];
  private installType = 1;

  get activeTreeIndex() {
    return AppModule.activeTreeIndex;
  }

  @Watch('uuid', { immediate: true })
  private uuidChange() {
    const componentTree: any = this.$refs.componentTree;
    componentTree && componentTree.setCurrentKey(this.uuid);
    this.selectedNode = {
      id: this.uuid
    };
  }

  get insertData() {
    return AppModule.insertData;
  }
  get uuid() {
    return AppModule.activeCompId;
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
    this.getCustomComp = _.debounce(this.getCustomComp, 500, { trailing: true });
    socket.on('generator.plugin.status', data => {
      Loading.close();
      this.getPlugin();
    });
    this.getScene();
  }

  async getScene() {
    const res = await socket.emit('generator.scene.getScene');
    this.sceneList = res.list;
  }

  private async getSceneTree() {
    const tree = await socket.emit('generator.scene.getSceneTree');
    this.tree = [tree];
  }

  private async getSceneConfig() {
    const res = await socket.emit('generator.scene.getConfig', {});
    this.dataCode = res.dataCode;
  }

  private async getCustomComp(value) {
    const res = await socket.emit('generator.data.getCustomComp', {
      value
    });
    this.customCompList = res;
    if (res && res.length > 0) {
      this.$nextTick(() => {
        this.$root.$emit('bind_client_drag');
      });
    }
  }

  private tabChange(index) {
    const codemirror: any = this.$refs.codemirror;
    AppModule.setActiveTreeIndex(index);
    this.getSceneTree();
    this.getScene();
    this.getSceneConfig();
    this.getCustomComp('');
    this.getFileList();
    this.getPlugin();

    setTimeout(() => {
      codemirror.codemirror.refresh();
    }, 100);
  }

  private handleNodeClick(node) {
    const viewContent: any = document.querySelector('#viewContent');
    viewContent.contentWindow.postMessage(
      {
        handler: 'view.component.selected',
        uuid: node.id
      },
      '*'
    );
    this.selectedNode = node;
    // AppModule.setUuid(node.id);
  }

  private async deleteComponent(id) {
    await socket.emit('generator.scene.deleteComponent', {
      id
    });
    this.getSceneTree();
  }

  private compClick(uuid) {
    const viewFrame: any = document.querySelector('#viewContent');
    viewFrame.contentWindow.postMessage(
      { handler: 'tree-selected', uuid },
      '*'
    );
  }

  async useScene(id) {
    const res = await socket.emit('generator.toolbar.useScene', {
      id
    });
  }

  async deleteScene(id) {
    const res = await socket.emit('generator.toolbar.deleteScene', {
      id
    });
    this.getScene();
  }

  async addTableColumn(id, selectedNode) {
    let node = selectedNode.parent;
    while (node && !(node.label == 'Table' || node.label == 'page')) {
      node = node.parent;
    }
    // nextSibling
    const params = {
      boxUuid: node.key,
      nextSiblingId: selectedNode.nextSibling
        ? selectedNode.nextSibling.data.id
        : '',
      id: 'Table/column.ts'
    };

    await socket.emit('generator.scene.addComponent', params);
    this.getSceneTree();
  }

  private handleCodeClick() {
    if (this.activeNameCode === 'json') {
      this.jsonData = JSON.stringify(
        eval(`function getData () {${this.dataCode}; return data;} getData()`)
      );
    }
  }

  private async getFileList() {
    const result = await socket.emit('generator.scene.getFileList');
    this.fileList = result.list;
  }

  private openToolDialog(item) {
    this.toolVisible = true;
    AppModule.setSelecedFileInfo(item);
  }

  private async updateCodeData() {
    const result = await socket.emit('generator.scene.setVueGenerator', {
      boxUuid: AppModule.boxUuid,
      data: {
        code: this.dataCode
      }
    });

    if (result && result.status === 0) {
      this.$message({
        message: '操作成功',
        type: 'success'
      });
    }
  }

  private async addComponent(item) {
    const { path, key, params } = item;
    const param = {
      boxUuid: AppModule.boxUuid,
      boxChildUuid: AppModule.boxChildrenUuid,
      id: key,
      params: params,
      path
    };
    Loading.open();
    await socket.emit('generator.scene.addComponent', param);
    Loading.close();
  }

  private searchChange(value) {
    this.getCustomComp(value);
  }

  private mousedownWidget (item) {
    this.widgetData = item;
    this.widgetData.id = this.widgetData.key;
    this.widgetData.type = 'custom';
    this.$root.$emit('mousedown_widget', this.widgetData);
  }

  private async openDrawerHandler(item) {
    this.openDrawer = true;
    const res = await socket.emit('generator.scene.handlerLifeCycle', {
      uuid: item.uuid,
      data: {
        handler: 'getData'
      }
    });
    this.jsonData = JSON.stringify(res);
  }

  private async installPlugin() {
    Loading.open();
    const res = await socket.emit('generator.plugin.installPlugin', {
      packageName: this.packageName,
      installType: this.installType,
    });
  }

  private async getPlugin() {
    const res = await socket.emit('generator.plugin.getPlugin', {
      packageName: this.packageName
    });
    const {list} = res;
    this.pluginList = list;
  }
}
</script>
<style lang="scss" scoped>
.component-box {
  display: flex;
  flex-direction: row;
  height: 100%;
}
.tabs {
  margin-right: 5px;
  flex-shrink: 0;
  color: #909399;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  padding-top: 20px;
}
.tabs-item {
  padding: 10px;
  .iconfont {
    font-size: 20px;
  }
}
.active.tabs-item {
  background-color: #f0f9eb;
}
.active .iconfont {
  color: #409EFF;
}
.tabs-body {
  height: 100%;
  overflow: scroll;
  width: 100%;
  width: 200px;
  border-right: 1px solid #dcdfe6;
}
.icon-add {
  color: #409eff;
  margin-left: 10px;
}
.icon-delete-comp {
  color: #f56c6c;
  margin-left: 10px;
  font-size: 16px !important;
}

.tree {
  overflow-y: auto;
  overflow-x: scroll;
  background-color: #ffffff;
}
.el-tree {
  min-width: 100%;
  font-size: 14px;
  display: inline-block !important;
}
.scene-list {
  padding: 5px;
}
.scene-item__name {
  position: absolute;
  bottom: 0;
  padding: 5px;
  width: 100%;
  box-sizing: border-box;
  background-color: #409EFF;
}
.scene-item {
  position: relative;
  text-align: center;
  margin-bottom: 10px;
}
.scene-item__title {
  color: #fff;
}
.scene__operate {
  opacity: 0;
  background: rgba(0, 0, 0, 0.65);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.scene__operate:hover {
  opacity: 1;
}
.scene__preview {
  width: 200px;
  height: 120px;
  background-position: top center;
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-color: #fff;
}
.iconfont{
  font-size: 12px;
  margin-right: 5px;
}
.icon-delete-tree{
  color: #fff;
}
.tree-tool{
  display: inline-block;
}
.icon-plus{
  padding: 0 6px;
  color: #909399;
}
.update-data{
  cursor: pointer;
}
.el-icon{
  font-size: 20px;
}
.custom-comp-box{
  padding: 10px;
  height: calc(100% - 70px);
}
.file-box{
  padding: 10px;
}

.tab-content{
  height: 100%;
}

.comp-box{
  height: 100%;
  padding-top: 10px;
  overflow: scroll;
}
.comp-item{
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, .1);
  border-radius: 2px;
  margin-bottom: 5px;
  &__title{
    color: #303133;
    font-size: 14px;
    margin-bottom: 5px;
  }
  &__des{
    color: #606266;
    font-size: 12px;
  }
}
.comp-item:hover{
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.drag-box{}
.drag-box-item {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 5px;
  box-sizing: border-box;
  position: relative;
  margin-bottom: 5px;
  overflow: hidden;
  border-bottom: 1px solid #F2F6FC;
}

.thumb-img{
  border: none;
  max-width: 100%;
  max-height: 100%;
}

.file-item {
  padding: 10px;
  border-bottom: 1px solid #dcdfe6;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.file-item:hover{
  background-color: #79bbff;
  color: #fff;
}
.custom-drawer{
  width: 321px;
}
.plugin-box{
  display: flex;
  padding: 10px 10px 0;
}
.plugin-list{
  margin-top: 10px;
}
.plugin-item{
  margin-bottom: 10px;
}
</style>
