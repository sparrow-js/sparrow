<template>
  <div class="toolbox">
    <el-tabs v-model="activeBoxName" type="border-card" class="tabs-box">
      <el-tab-pane label="工具盒" class="widget-collapse" name="tool">
        <div class="tool-filter">
          <div>
            <el-input 
              placeholder="请输入内容"
              v-model="search"
              @input="searchChange"
            >
              <i slot="suffix" class="el-input__icon iconfont icon-search1"></i>
            </el-input>
          </div>
          <div style="margin-top: 15px">
            <el-radio-group
              v-model="widget"
              size="small"
              @change="toggleWidget"
            >
              <el-radio-button label="组件"></el-radio-button>
              <el-radio-button label="编辑区块"></el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="widget-box" v-if="widget === '组件'">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item
              v-for="(item, index) in compList"
              :key="item.label"
              :title="item.label"
              :name="index"
            >
              <div class="comp-list">
                <div
                  class="comp-item"
                  v-for="(comp, index) in item.list"
                  :key="index"
                  @mousedown="mousedownWidget(comp, item.type)"
                  @click="addComp(comp.key, comp.params, comp)"
                >
                  <div class="drag-box">
                    <div class="drag-box-item" :data-name="comp.label">
                      <div class="svg-icon-box">
                        <svg class="icon svg-icon" aria-hidden="true">
                          <use :xlink:href="comp.icon"></use>
                        </svg>
                      </div>
                      <span class="comp-list-label">{{ comp.label }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="widget-box" v-if="widget === '编辑区块'">
           <el-collapse v-model="editBlockActiveNames" @change="handleChange">
            <el-collapse-item
              v-for="(item, index) in editBlockList"
              :key="index"
              :title="item.label"
              :name="index"
            >
              <div class="comp-list">
                <div
                  class="edit-box-item"
                  v-for="(comp, index) in item.list"
                  :key="index"
                  @mousedown="mousedownWidget(comp, item.type)"
                  @click="addEditComp(comp.key, comp.params, comp.path)"
                >
                  <div class="drag-box">
                    <div class="drag-box-item" :data-name="comp.label">
                      <img :src="comp.thumb" style="width: 100%" />
                      <span class="comp-list-label edit-box-label">{{ comp.label }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-tab-pane>
      <el-tab-pane label="属性" class="widget-collapse" name="setting">
        <FormSetting @change="settingChange" />
        <div class="footer-delete" @click="deleteComp">
          删除
        </div>
      </el-tab-pane>
    </el-tabs>

    <div>
      <el-dialog
        width="360px"
        title="创建文件"
        :visible.sync="dialogCreateFileVisible"
      >
        <el-form :model="form">
          <el-form-item label="文件名">
            <el-input v-model="form.fileName" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogCreateFileVisible = false"
            >取消</el-button
          >
          <el-button size="small" type="primary" @click="fileHandler"
            >确定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Loading from '@/util/loading';
import { AppModule } from '@/store/modules/app';
import FormSetting from './FormSetting';
import Sortable from 'sortablejs';
import Message from '@/util/MessageWorker';

export default {
  components: {
    FormSetting,
  },
  data() {
    return {
      search: '',
      widget: '组件',
      compList: [],
      activeNames: [0, 1, 2, 3, 4, 5, 6],
      blockNames: [0],
      staticBlockList: [],
      widgetData: {},
      editBlockList: [],
      editBlockActiveNames: [0, 1, 2, 3, 4, 5, 6],
      form: {
        fileName: ''
      },
      dialogCreateFileVisible: false,
      fileParams: {},
      activeBoxName: 'tool',
      settingId: '',
      relatedId: ''
    };
  },
  async created() {
    this.getWidgetList = _.debounce(this.getWidgetList, 500, { trailing: true });
    setTimeout(() => {
      this.getWidgetList('');
    }, 2000);

    this.$EventBus.$on('sparrow-worker-load', () => {
      setTimeout(() => {
        this.getWidgetList('');
      }, 1000)
    });
    
    this.$root.$on('bind_client_drag', (data) => {
      this.bindClientDrag();
    });
    this.$root.$on('mousedown_widget', (data) => {
      this.widgetData = data;
    });

    this.img = new Image();
    this.img.style.position = 'absolute';
    this.img.style.top = '-10000px';
    this.img.style.width = '100px';
    document.body.appendChild(this.img);

  },
  mounted() {
    Message.on('codesandbox', ({data = {}}) => {
      if (data.type === 'done' || data.type === 'test') {
        this.bindDrag();
      }
    });


    // setTimeout(() => {
    //   this.bindClientDrag();
    // }, 3000);
  },
  methods: {
    async addComp(id, config, comp) {
      const params = {
        boxUuid: AppModule.boxUuid,
        id,
        type: comp.type,
        params: config
      };

      if (id === 'File') {
        this.dialogCreateFileVisible = true;
        this.fileParams = {
          boxUuid: AppModule.boxUuid,
          id,
          type: comp.type,
          params: config
        };
        return;
      }
      const res = await Message.emit('generator.scene.addComponent', params);      
      this.dialogVisible = false;
      // setTimeout(() => {
      //   this.bindDrag();
      // }, 500);
    },

    async addEditComp (id, config, path) {
      const params = {
        boxUuid: AppModule.boxUuid,
        id,
        params: config,
        path
      };
      await Message.emit('generator.scene.addEditComp', params);
    },

    mousedownWidget(widget, type) {
      this.widgetData = widget;
      this.widgetData.id = this.widgetData.key;
      this.widgetData.type = type;
    },

    handleChange() {
      // material.index.getBlocks
    },
    async toggleWidget(value) {
      if (value === '静态区块') {
        await this.getStaticBlock();
      }
      if (value === '编辑区块') {
        await this.getEditBlockList();
      }
      this.bindClientDrag();
    },
    async getStaticBlock() {
      const blockList = await Message.emit('material.index.getBlocks');
      this.staticBlockList = blockList.list;
    },

    async getEditBlockList() {
      const blockList = await Message.emit('generator.data.getEditBlockList');
      
      this.editBlockList = blockList.data;
    },

    async addStaticBlock(id, originData) {
      Loading.open();
      await Message.emit('generator.scene.addBlock', {
        boxUuid: AppModule.boxUuid, 
        id,
        originData 
      });
    },

    findBoxNode(node) {
      let tempNode = node;

      while (tempNode && tempNode.dataset && tempNode.dataset.type !== 'box') {
        tempNode = tempNode.parentNode;
      }
      if (tempNode && tempNode.dataset && tempNode.dataset.type === 'box') {
        return tempNode;
      }
      return null;
    },
    cancelBoxActive() {
      const boxNodeList = document
        .querySelector('#viewContent')
        .contentDocument.querySelector('[title=sandpack-sandbox]')
        .contentDocument.querySelectorAll('[data-type="box"]');
      boxNodeList.forEach(item => {
        item.removeAttribute('data-active');
      });
    },

    bindDrag() {
      const iframe = document.querySelector('#viewContent').contentDocument.querySelector('[title=sandpack-sandbox]');
      var doc = iframe.contentDocument;
      if (!doc) return;
      const list = doc.querySelectorAll('.drag-box');
      list.forEach(item => {
        Sortable.create(item, {
          group: {
            name: 'shared',
            // pull: 'clone',
          },
          forceFallback: false,
          animation: 150,
          fallbackOnBody: true,
          swapThreshold: 0.1,
          sort: false,
          ghostClass: 'sortable-ghost',
          dragClass: 'drag-class',
          onStart: event => {},
          setData: (dataTransfer, dragEl) => {
            this.setDragImage(dataTransfer, dragEl, '拖拽组件');
          },
          onMove: evt => {
            const { related } = evt;
            const relatedId = related.dataset.id;
            if (this.relatedId !== relatedId) {
              const boxNode = this.findBoxNode(related);
              if (boxNode) {
                this.cancelBoxActive();
                boxNode.setAttribute('data-active', true);
              }
            }
            this.relatedId = relatedId;
          },
          onEnd: event => {
            const item = event.item;
            const compId = item.getAttribute('data-id') || item.querySelector('[data-design-mode*=design-]').getAttribute('data-id');
            const boxId = event.to.getAttribute('data-id');
            const nextSiblingId =
              item.nextElementSibling &&
              item.nextElementSibling.getAttribute('data-id');
            // item.remove();
            this.dragViewWidget(compId, boxId, nextSiblingId);
          }
        });
      });
    },
    
    bindClientDrag() {
      const dragList = document.querySelectorAll('.drag-box');

      dragList.forEach(item => {
        Sortable.create(item, {
          group: {
            name: 'shared',
            pull: 'clone',
            put: false,
          },
          sort: false,
          ghostClass: 'sortable-ghost',
          forceFallback: false,
          dragClass: 'drag-class',
          chosenClass: 'chosen-class',
          setData: (dataTransfer, dragEl) => {
            this.setDragImage(dataTransfer, dragEl);
          },
          onMove: evt => {
            const { related } = evt;
            const relatedId = related.dataset.id;
            if (this.relatedId !== relatedId) {
              const boxNode = this.findBoxNode(related);
              if (boxNode) {
                this.cancelBoxActive();
                boxNode.setAttribute('data-active', true);
              }
            }
            this.relatedId = relatedId;
          },
          onStart: event => {
            this.$forceUpdate();
          },
          onEnd: async event => {
            // this.$forceUpdate();
            const item = event.item;
            const boxUuid = event.to.getAttribute('data-id');

            const nextSiblingId =
              item.nextElementSibling &&
              item.nextElementSibling.getAttribute('data-id');
            if (item.ownerDocument.querySelector('.sparrow-view')) {
              item.remove();
            }

            if (this.widgetData.key === 'File') {
              this.dialogCreateFileVisible = true;
              this.fileParams = {
                boxUuid,
                nextSiblingId,
                id: this.widgetData.id,
                type: this.widgetData.type,
                params: this.widgetData.params,
                path: this.widgetData.path || ''
              };
              return;
            }
            if (this.widgetData.type ==='editBox') {
              const params = {
                boxUuid,
                id: this.widgetData.id,
                params: this.widgetData,
                path: this.widgetData.path || ''
              };

              await Message.emit('generator.scene.addEditComp', params);

            } else if (this.widgetData.type === 'block') {
              Loading.open();
              await Message.emit('generator.scene.addBlock', {
                boxUuid,
                id: this.widgetData.id,
                type: this.widgetData.type,
                originData: this.widgetData.originData
              });
            } else {
              const params = {
                boxUuid,
                nextSiblingId,
                id: this.widgetData.id,
                type: this.widgetData.type,
                params: this.widgetData.params,
                path: this.widgetData.path || ''
              };              
              Loading.open();
              await  Message.emit('generator.scene.addComponent', params);
              Loading.close();
            }
          }
        });
      });
    },

    async fileHandler() {
      this.dialogCreateFileVisible = false;
      Loading.open();
      await Message.emit('generator.scene.addComponent', {
        ...this.fileParams,
        fileName: this.form.fileName
      });
      Loading.close();
    },
    async getWidgetList(value) {
      const componentMap = await Message.emit('generator.data.getWidgetList', {value});
      this.compList = componentMap.data;
      this.$nextTick(() => {
        this.bindClientDrag();
      })
    },
    searchChange (value) {
      this.getWidgetList(value);
    },
    async dragViewWidget (compId, boxId, nextSiblingId) {
      await Message.emit('generator.scene.dragViewWidgetHandler', {
        compId,
        boxId,
        nextSiblingId,
      });

      // setTimeout(() => {
      //   this.bindDrag();
      // }, 500)
    },
    settingChange (data) {
      this.settingId = data.id;
      // this.activeBoxName = 'setting';
    },
    async deleteComp () {  
      await Message.emit('generator.scene.deleteComponent', {
        id: this.settingId
      });
      this.activeBoxName = 'tool';

    },
    dragHandler () {
      this.bindClientDrag();

      // this.bindDrag();
    },

    setDragImage (dataTransfer, dragEl, text = '') {
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 60;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, 200, 60);
      context.fillStyle = '#00000090';
      context.fillRect(0, 0, 200, 60);
      context.font = '24px Georgia';
      context.fillStyle = '#fff';
      context.fillText(text || dragEl.dataset.name, 30, 40);
      this.img.src = canvas.toDataURL();
      document.body.appendChild(this.img);
      dataTransfer.setDragImage(this.img, 10, 10);
    },

  }
};
</script>
<style lang="scss" scoped>
.toolbox {
  width: 280px;
  padding-right: 10px;
  height: 100%;
}
.comp-list {
  display: flex;
  flex-direction: row;
  border-top: 1px solid #d7d7d7;
  border-left: 1px solid #d7d7d7;
  flex-wrap: wrap;
}
.comp-item {
  width: 33%;
  height: 80px;
  text-align: center;
  vertical-align: top;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.edit-box-item{
  width: 50%;
  height: 120px;
  text-align: center;
  vertical-align: top;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.edit-box-item:hover{
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.comp-item:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.block-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
}
.block-item {
  color: #fff;
  width: 100%;
  flex-shrink: 0;
  box-sizing: border-box;
  list-style: none;
  border: 1px solid #d7d7d7;
  margin-bottom: 10px;
  cursor: pointer;
}
.block-item:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.block__preview {
  width: 100%;
  height: 100%;
  background-position: top center;
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-color: #fff;
}

.block {
  &__toolbar {
    background-color: #30303d;
    height: 150px;
    position: relative;
  }
  &__preview {
    width: 100%;
    height: 100%;
    background-position: top center;
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-color: #fff;
  }
  &__operate {
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
  &__operate:hover {
    opacity: 1;
  }

  &-content {
    background-color: #409eff;
    padding: 10px;
    margin-top: 1px;
    text-align: left;
  }
  &-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    line-height: 22px;
    color: rgba(255, 255, 255, 0.85);
    font-weight: 500;
  }
  &-des {
    margin-top: 4px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.45);
    letter-spacing: 0;
    line-height: 20px;
    height: 40px;
    margin-bottom: 0;
  }
  &-label__box {
    margin-top: 5px;
  }
  &-label__item {
    margin-right: 4px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.45);
  }
}
.add-component {
  display: flex;
  flex-direction: column;
  &__label {
    text-align: left;
    margin-bottom: 3px;
  }
}
.tool-filter {
  // position: absolute;
  // top: 0;
  // background: #fff;
}
.widget-box {
  height: calc(100% - 100px);
  overflow: scroll;
  // margin-top: 200px;
}
.tabs-box {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.widget-collapse {
  height: 100%;
}
.no-widget {
  padding: 10px;
  color: #909399;
}
.drag-box{
  width: 100%;
  height: 100%;
}
.drag-box-item {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 5px;
  border-right: 1px solid #d7d7d7;
  border-bottom: 1px solid #d7d7d7;
  box-sizing: border-box;
  position: relative;
}
.edit-box-label{
  position: absolute;
  bottom: 5px;
}

.footer-delete{
  height: 48px;
  width: 100%;
  font-size: 16px;
  color: #F56C6C;
  border: 1px solid #d7dae2;
  border-radius: 4px;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f5;
  cursor: pointer;
}
.footer-delete:hover{
  background-color: #fef0f0;
}

.svg-icon{
  // width: 2em;
}
.svg-icon-box{
  width: 36px;
  height: 46px;
}
.icon{
  height: 28px;
}
</style>
<style lang="scss">
.toolbox .el-tabs--border-card>.el-tabs__content{
  height: 100%;
}
.drag-class{
  // display: none !important;
  // background: red;
}
</style>
