<template>
  <el-dialog
    title="提示"
    :visible.sync="fileVisible"
    width="460px"
    :before-close="handleClose"
  >
    <div class="path-box">
      <span class="path-up el-icon-top" @click="upDirHandler"></span>
      <el-input
        placeholder="请选择目录"
        size="small"
        v-model="pathName"
        :disabled="pathInputDisable"
      >
        <i
          @click="editPathHandler"
          slot="suffix"
          class="el-input__icon el-icon-edit"
        ></i>
      </el-input>
    </div>
    <div class="folder-box">
      <el-input placeholder="新建文件夹" size="small" v-model="folderName">
      </el-input>
    </div>
    <ul class="dir-list">
      <li
        class="dir-item"
        v-for="(item, index) in folderInfo.directories"
        :key="index"
        @click="downDirHandler(item)"
      >
        <span class="dir-icon el-icon-folder-opened"></span>
        <span>{{ item }}</span>
      </li>
    </ul>
    <span slot="footer" class="dialog-footer">
      <el-button @click="fileVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" @click="exportHandler" size="mini"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>
<script lang="ts">
import socket from '@/util/socket.js';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'FileExport'
})
export default class extends Vue {
  @Prop({ default: false }) private dialogVisible: boolean;
  @Prop({ default: () => [] }) private workFolder: any;

  private pathName = '';
  private pathInputDisable = true;
  private folderInfo = {
    path: '',
    directories: []
  };

  private folderName = '';

  created() {
    this.folderInfo = this.workFolder;
    this.pathName = this.folderInfo.path;
  }

  get fileVisible() {
    return this.dialogVisible;
  }

  set fileVisible(value) {
    this.$emit('update:dialogVisible', value);
  }

  private handleClose() {
    this.fileVisible = false;
  }

  private editPathHandler() {
    this.pathInputDisable = !this.pathInputDisable;
  }

  private upDirHandler() {
    this.downDirHandler('..');
  }

  private async downDirHandler(dir) {
    const result = await socket.emit('home.setting.setWorkFolderBySub', {
      subDirectory: dir
    });
    const { path, directories } = result;
    this.folderInfo.directories = directories;
    this.pathName = path;
    this.pathInputDisable = true;
  }

  private async exportHandler() {
    await socket.emit('generator.toolbar.exportFile', {
      directory: this.pathName,
      folderName: this.folderName
    });
    this.fileVisible = false;
  }
}
</script>
<style lang="scss" scoped>
.path-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  .path-up {
    display: flex;
    align-items: center;
    color: #409eff;
    font-size: 16px;
    font-weight: bold;
    margin-right: 5px;
  }
}
.folder-box{
  margin-top: 10px;
  margin-left: 20px;
  margin-bottom: 10px;
}
.dir-list {
  list-style: none;
  padding: 0;
  font-size: 18px;
  max-height: 300px;
  overflow: scroll;
  .dir-item {
    padding: 4px;
    margin-left: 20px;
    color: #666666;
  }
  .dir-item:hover {
    background: #ecf5ff;
  }
  .dir-icon {
    margin-right: 6px;
  }
}
</style>
