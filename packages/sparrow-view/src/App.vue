<template>
  <div id="app"> 
    <router-view/>
    <!-- <toolbar 
      :list="toolbarList" 
      :is-show-toolbar="isShowToolbar" 
      @change="showToolbarChange"
    /> -->
    <inline-toolbar />
  </div>
</template>
<script>
import message from './utils/message';
import { Event } from '@sparrow-vue/boxs';
import _ from 'lodash';

export default {
  data () {
    return {
      toolbarList: [],
      boxIndex: null,
      uuid: '',
      isShowToolbar: false
    }
  },
  created () {
    this.getSelection = _.debounce(this.getSelection, 500, {
      trailing: true
    })
    document.addEventListener("selectionchange", () => {
      this.getSelection();
    });

    document.addEventListener('click', () => {
      Event.emit('text-selection-hide');
    });

    window.addEventListener('message',(e) => {
      const {data} = e;
      if (data && data.handler === 'document-click') {
        this.isShowToolbar = false;
      }
    },false);
    this.getToolbarList();
    Event.on('block-selected', (data) => {
      this.boxIndex = data.index;
      this.uuid = data.uuid;
    });

    // 插入物料处理
    Event.on('insert_handler', (data) => {
      setTimeout(() => {
        const {params} = data;
        // if (params && params.uuid) {
        //   this.uuid = params.uuid;
        // }
        message.emit(data.emit || 'client.dashboard.show', {
          boxIndex: this.boxIndex,
          uuid: this.uuid,
          data,
        });
      }, 300);
    })

    Event.on('pivot_setting', (setting) => {
      setTimeout(() => {
        message.emit('client.setting.show', {
          boxIndex: this.boxIndex,
          uuid: this.uuid,
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
    },
    getSelection () {
      const selection = document.getSelection();
      const {anchorOffset, focusOffset, anchorNode} = selection;
      if (anchorNode && anchorNode.wholeText && anchorNode.parentNode.classList.contains('edit-cell')) {
        const selectedText = anchorNode.wholeText.substring(focusOffset, anchorOffset);
        if (!selectedText) return;
        Event.emit('text-selection',{
          rect: anchorNode.parentNode.getBoundingClientRect(),
          type: 'edit-cell',
          value: selectedText,
        });
      }
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
  .el-table .cell{
    overflow: initial !important;
  }
  .el-button--mini{
    padding: 4px 8px !important;
  }
  .block-list{
    margin-bottom: 10px;
  }
  .custom-inline{
    padding-left: 60px;
  }
</style>
