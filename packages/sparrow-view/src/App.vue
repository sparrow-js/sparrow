<template>
  <div id="app"> 
    <router-view/>
    <toolbar 
      :list="toolbarList" 
      :is-show-toolbar="isShowToolbar" 
      @change="showToolbarChange"
    />
  </div>
</template>
<script>
import message from './utils/message';
import { Event } from '@sparrow-vue/boxs'

export default {
  data () {
    return {
      toolbarList: [],
      boxIndex: null,
      isShowToolbar: false
    }
  },
  created () {
    window.addEventListener('message',(e) => {
      const {data} = e;
      if (data && data.handler === 'document-click') {
        this.isShowToolbar = false;
      }
    },false);
    this.getToolbarList();
    Event.on('block-selected', (data) => {
      this.boxIndex = data.index;
    });

    // 插入物料处理
    Event.on('insert_handler', (data) => {
      setTimeout(() => {
        message.emit(data.emit || 'client.dashboard.show', {
          boxIndex: this.boxIndex,
          data,
        });
      }, 300);
    })

    Event.on('pivot_setting', (setting) => {
      setTimeout(() => {
        message.emit('client.setting.show', {
          boxIndex: this.boxIndex,
          box: {
            index: this.boxIndex
          },
          setting
        });
      }, 300);
    });

  },
  methods: {
    async getToolbarList () {
      const result = await message.emit('generator.data.getBoxList')
      this.toolbarList = result.list;
    },
    showToolbarChange (data) {
      this.isShowToolbar = data;
    }
  }
}
</script>
<style>
  .el-form--inline .comp-box{
    display: inline-block;
  }


  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
