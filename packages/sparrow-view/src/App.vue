<template>
  <div id="app" @click="clickApp" class="sparrow-view"> 
    <router-view/>
    <inline-toolbar />
  </div>
</template>
<script>
import message from './utils/message';
import { Event } from '@sparrow-vue/boxs';
import _ from 'lodash';
import html2canvas from 'html2canvas';

export default {
  data () {
    return {
      uuid: '',
      isShowToolbar: false
    }
  },
  created () {
    document.addEventListener('keydown', (e) => {
      if(e.metaKey && e.keyCode === 67) {
        message.emit('client.screen.keydown', {
          operate: 'ctrl+c'
        });
      }

      if (e.metaKey && e.keyCode === 86) {
        message.emit('client.screen.keydown', {
          operate: 'ctrl+v'
        });
      }

      if (e.metaKey && e.keyCode === 8) {
        message.emit('client.screen.keydown', {
          operate: 'delete',
          keyCode: e.keyCode
        });
      }

    });

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

      if (data && data.handler === 'html-2-canvas') {
        var node = document.querySelector('#app');

        html2canvas(node).then(function(canvas) {
           message.emit('client.screen.capture', {
            url: canvas.toDataURL()
          });
        });
      }
      // emitComponentSelected
      if(data.handler === 'view.component.selected') {
        this.emitComponentSelected(data.uuid)
      }
    },false);
    Event.on('block-selected', (data) => {
      this.uuid = data.uuid;
    });

    // 插入物料处理
    Event.on('insert_handler', (data) => {
      setTimeout(() => {
        const {params} = data;
        message.emit(data.emit || 'client.dashboard.show', {
          uuid: this.uuid,
          data,
        });
      }, 200);
    })

  },
  mounted () {
    this.bindBoxClick();
  },
  methods: {
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
    },
    clickApp () {
      message.emit('client.app.init', {
        uuid: '',
      });
    },
    bindBoxClick () {
      // const boxList = document.querySelectorAll('[data-design-mode*=design-]');
      //.addEventListener('click', )
      document.body.addEventListener('click', (event) => {
        let {target} = event;
        while(target && target.dataset.designMode === undefined) {
          const node = target.parentNode;
          if (node.nodeName === 'BODY') {
            target = undefined;
          } else {
            target = node;
          }
        }
        this.emitCompMessage(target);
      })
    },
    emitComponentSelected (uuid) {
      const comp = document.querySelector( '[data-id="' + uuid + '"]');
      this.emitCompMessage(comp);
    },
    emitCompMessage (target) {
      if (target) {
        const boxList = document.querySelectorAll('[data-design-mode*=design-]');
        boxList.forEach((item) => {
          item.removeAttribute('data-active');
        })
        target.setAttribute('data-active', true);
        const uuid = target.dataset.id;
        if (target.dataset.type === 'component') {
          message.emit('client.dispatch.component', {
            uuid,
            childUuid: target.dataset.childId || '',
            data: {
              params: {
                uuid,
              }
            }
          });
        } else {
          message.emit('client.dispatch.box', {
            uuid,
            childUuid: target.dataset.childId || '',
            data: {
              params: {
                uuid,
              }
            }
          });
        }
        
      }
    }
  }
}
</script>
<style>
  html, body, #app{
    height: 100%;
  }
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
    /* margin-bottom: 10px; */
  }
  .custom-inline{
    padding-left: 60px;
  }
  .home{
    height: 100%;
  }
  .sortable-ghost{
    /* height: 3px !important; */
    overflow: hidden;
    background: #409EFF;
    padding: 0 !important; 
    min-height: 0px !important;
    height: 0;
    outline: 1px solid #1861d5!important;
    margin: 0 !important;
    padding: 0 !important;
  }
  

  .sortable-ghost *{
    display: none !important;
  }
  /* .drag-box{
    min-height: 24px;
  } */
  .sortable-chosen{
    /* display: none; */
  }
  /* .sortable-fallback{
    background: red;
    width: 100px;
    height: 10px;
  } */
  .empty-container{
    width: 50px;
    margin-left: calc(50% - 25px);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #C0C4CC;
  }
  [data-design-mode=design-border-box] {
    padding: 5px;
  }
  [data-design-mode*=design-]{
    position: relative;
    min-height: 30px;
    min-width: 30px;
  }
  [data-design-mode*=design-][data-active=true]{
    outline: 1px solid #1861d5!important;
    position: relative;
  }

  [data-design-mode*=design-]:hover {
    outline: 1px dotted #2077ff
  }


  [data-design-mode*=design-][data-active=true]:before{
    display: block !important;
    color: #fff!important;
    background: #1861d5!important;
  }

  [data-design-mode*=design-]:before{
    display: none !important;
    content: attr(data-instance-name)!important;
    position: absolute;
    left: 0;
    top: 0;
    right: unset;
    bottom: unset;
    color: #666!important;
    font-size: 12px!important;
    float: left;
    padding: 0 5px!important;
    line-height: 12px!important;
    height: 12px;
    overflow: hidden;
    background: hsla(0,0%,87.1%,.7);
    z-index: 2;
    border-left: 3px solid transparent;
    transform-origin: 0 0;
    transform: scale(.8);
    transition: all .3s ease
  }
  .design-container{
    overflow: hidden;
  }

.clearfix:after {
    content: ".";
    display: block;
    clear: both;
    visibility: hidden;
    height: 0;
    font-size:0;
}

[data-empty=true]:after{
  content: "\8BF7\62D6\5165\7EC4\4EF6";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  opacity: 1!important;
  visibility: visible!important;
  line-height: 30px;
  height: 30px;
  font-size: 13px;
  color: #ccc;
  text-align: center;
}

.home{
  background-repeat: no-repeat;
  background-position: center;
  background-size: 400px;
}

</style>
