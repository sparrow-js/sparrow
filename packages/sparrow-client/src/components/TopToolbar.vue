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
          :class="{'active-preview': previewStatus}"
          @click="previewHandler"
        >
          <font-awesome-icon :icon="['fas', 'eye']" />
        </span>
      </el-tooltip>
    </div>
    <div class="toolbar__item">
      <el-tooltip class="item" effect="dark" content="导出" placement="top">
        <span
          @click="fileExportHandler"
        >
          <font-awesome-icon :icon="['fas', 'file-export']" />
        </span>
      </el-tooltip>
    </div>
    <div class="toolbar__item">
      <el-tooltip class="item" effect="dark" content="源代码" placement="top">
        <font-awesome-icon :icon="['fas', 'code']" />
      </el-tooltip>
    </div>
    <file-export
      :dialog-visible.sync="dialogVisible" 
      :work-folder="workFolder"
      v-if="workFolder"
    ></file-export>
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
  private previewStatus = false;
  private dialogVisible = false;
  private workFolder = null;
  async created() {
    const result = await socket.emit('home.setting.workFolder');
    this.workFolder = result;
  }

  private async previewHandler () {
    this.previewStatus = !this.previewStatus;

    await socket.emit('generator.toolbar.previewView', {
      status: this.previewStatus
    });
  }

  private trashHandler () {
    this.$confirm('此操作将重置, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      await socket.emit('generator.toolbar.trash');
    }).catch(() => {});
  }

  private fileExportHandler () {
    this.dialogVisible = true;
  }

  private toolbarClick () {
    const viewFrame: any = document.querySelector('#viewContent');
    viewFrame.contentWindow.postMessage({handler: 'document-click'}, '*');
  }
  
}
</script>
<style lang="scss" scoped>
  .toolbar{
    display: flex;
    flex-direction: row;
    margin-left: 10px;
    &__item{
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 6px;
      color: #666;
      font-size: 14px;
      margin-right: 16px;
      &:hover{
        color: #3e71f7;
      }
    }
    .active-preview{
      color: #0247fb;
    }
  }
</style>