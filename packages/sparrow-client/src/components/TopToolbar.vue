<template>
  <div class="toolbar" @click="toolbarClick">
    <div class="toolbar__item">
      <el-tooltip class="item" effect="dark" content="重置" placement="top">
        <span @click="trashHandler">
          <font-awesome-icon :icon="['fas', 'trash-restore-alt']" />
        </span>
      </el-tooltip>
    </div>

    <div class="toolbar__item toolbar__preview">
      <el-tooltip class="item" effect="dark" content="预览" placement="top">
        <span
          :class="{ 'active-preview': previewStatus }"
          @click="previewHandler"
        >
          <font-awesome-icon :icon="['fas', 'eye']" />
        </span>
      </el-tooltip>
    </div>
    <div class="toolbar__item">
      <el-tooltip class="item" effect="dark" content="导出" placement="top">
        <span @click="fileExportHandler">
          <font-awesome-icon :icon="['fas', 'file-export']" />
        </span>
      </el-tooltip>
    </div>
    <div class="toolbar__item">
      <el-tooltip class="item" effect="dark" content="源代码" placement="top">
        <span @click="openEditorHandler">
          <font-awesome-icon :icon="['fas', 'code']" />
        </span>
      </el-tooltip>
    </div>

    <div class="toolbar__item">
      <el-tooltip class="item" effect="dark" content="保存" placement="top">
        <span  @click="getSerializeTree">
          <font-awesome-icon :icon="['fas', 'file']" />
        </span>
      </el-tooltip>
    </div>

    <div class="toolbar__item success" @click="showPopover = !showPopover">
      <el-tooltip class="item" effect="dark" content="场景" placement="top">
        <span>
          <font-awesome-icon :icon="['fas', 'file']" />
        </span>
      </el-tooltip>
    </div>

    <file-export
      :dialog-visible.sync="dialogVisible"
      :work-folder="workFolder"
      v-if="workFolder"
    ></file-export>

    <el-popover
      ref="popover"
      v-model="showPopover"
      placement="right"
      title="场景"
      width="200"
      trigger="click"
    >
      <span class="scene-item" @click="sceneHandler('BaseForm')">基础表单</span>
      <span class="scene-item" @click="sceneHandler('BaseTable')">基础表格</span>
      <span class="scene-item" @click="sceneHandler('BaseTest')">test</span>
    </el-popover>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import socket from '@/util/socket.js';
import FileExport from './FileExport.vue';

@Component({
  name: 'TopToolbar',
  components: {
    FileExport
  }
})
export default class extends Vue {
  private previewStatus = 0;
  private dialogVisible = false;
  private sceneDialogVisible = false;
  private workFolder = null;
  private showPopover = false;
  async created() {
    const result = await socket.emit('home.setting.workFolder');
    this.workFolder = result;
  
    this.init();
    socket.on('generator.toolbar.openCodeEditor.result', data => {
      this.$message.error('打开编辑器失败，请将编辑器注册到终端命令行中');
    });
  }

  private async previewHandler() {
    this.previewStatus = this.previewStatus === 0 ? 1 : 0;

    await socket.emit('generator.toolbar.previewView', {
      status: this.previewStatus
    });
    location.reload();
  }

  private async init() {
    const result = await socket.emit('generator.scene.getParams');
    this.previewStatus = result.previewViewStatus;
  }

  private trashHandler() {
    this.$confirm('此操作将重置, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        await socket.emit('generator.toolbar.trash');
        location.reload();
      })
      .catch(() => {});
  }

  private fileExportHandler() {
    this.dialogVisible = true;
  }

  private toolbarClick() {
    const viewFrame: any = document.querySelector('#viewContent');
    viewFrame.contentWindow.postMessage({ handler: 'document-click' }, '*');
  }

  private async getSerializeTree () {
    await socket.emit('generator.scene.getSerializeTree');
  }

  private async openEditorHandler() {
    await socket.emit('generator.toolbar.openCodeEditor');
  }

  private async sceneHandler(name) {
    // this.$refs.popover.hide();

    await socket.emit('generator.toolbar.initScene', {
      name,
    });
    this.showPopover = false;
  }

  handleDragStart(node, ev) {
    console.log('drag start', node);
  }

  handleDragEnter(draggingNode, dropNode, ev) {
    console.log('tree drag enter: ', dropNode.label);
  }
  handleDragLeave(draggingNode, dropNode, ev) {
    console.log('tree drag leave: ', dropNode.label);
  }

  handleDragOver(draggingNode, dropNode, ev) {
    console.log('tree drag over: ', dropNode.label);
  }

  handleDragEnd(draggingNode, dropNode, dropType, ev) {
    console.log('tree drag end: ', dropNode && dropNode.label, dropType);
  }

  handleDrop(draggingNode, dropNode, dropType, ev) {
    console.log('tree drop: ', dropNode.label, dropType);
  }

  allowDrop(draggingNode, dropNode, type) {
    if (dropNode.data.label === '二级 3-1') {
      return type !== 'inner';
    } else {
      return true;
    }
  }
  
  allowDrag(draggingNode) {
    return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
  }

}
</script>
<style lang="scss" scoped>
.toolbar {
  display: flex;
  flex-direction: row;
  margin-left: 10px;
  &__item {
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 6px;
    color: #666;
    font-size: 14px;
    margin-right: 16px;
    &:hover {
      color: #3e71f7;
    }
  }
  &__item.success {
    color: #67c23a;
  }
  .active-preview {
    color: #0247fb;
  }
}
.scene-item {
  background-color: #ecf5ff;
  display: inline-block;
  height: 32px;
  padding: 0 10px;
  line-height: 30px;
  font-size: 12px;
  color: #409eff;
  border: 1px solid #d9ecff;
  border-radius: 4px;
  box-sizing: border-box;
  white-space: nowrap;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}
</style>
