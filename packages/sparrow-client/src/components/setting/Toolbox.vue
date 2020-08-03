<template>
  <div class="toolbox">
    <el-tabs type="border-card" class="tabs-box">
      <el-tab-pane label="工具盒" class="widget-collapse">
        <div class="tool-filter">
          <div>
            <el-input 
              placeholder="请输入内容"
              v-model="search"
              @input="searchChange"
            >
              <i slot="suffix" class="el-input__icon el-icon-search"></i>
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
              <el-radio-button label="静态区块"></el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="widget-box" v-if="widget === '组件'">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item
              v-for="(item, index) in compList"
              :key="index"
              :title="item.label"
              :name="index"
            >
              <div class="comp-list">
                <div
                  class="comp-item"
                  v-for="(comp, index) in item.list"
                  :key="index"
                  @mousedown="mousedownWidget(comp, item.type)"
                  @click="addComp(comp.key, comp.params)"
                >
                  <div class="drag-box">
                    <div class="drag-box-item">
                        <span class="comp-list-label">{{ comp.label }}</span>
                    </div>
                  </div>
       
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div v-if="widget === '编辑区块'">
           <el-collapse v-model="editBlockActiveNames" @change="handleChange">
            <el-collapse-item
              v-for="(item, index) in editBlockList"
              :key="index"
              :title="item.label"
              :name="index"
            >
              <div class="comp-list">
                <div
                  class="comp-item"
                  v-for="(comp, index) in item.list"
                  :key="index"
                  @mousedown="mousedownWidget(comp, item.type)"
                  @click="addComp(comp.key, comp.params)"
                >
                  <div class="drag-box">
                    <div class="drag-box-item">
                        <span
                      class="comp-list-label">{{ comp.label }}</span>
                    </div>
                  </div>
       
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="widget-box" v-if="widget === '静态区块'">
          <el-collapse v-model="blockNames" @change="handleChange">
            <el-collapse-item title="区块" :name="0">
              <div class="block-list drag-box">
                <div
                  class="block-item"
                  v-for="item in staticBlockList"
                  :key="item.key"
                  @mousedown="mousedownWidget(item, 'block')"
                  @click="addStaticBlock(item.key, item.originData)"
                >
                  <div class="block">
                    <div class="block__toolbar">
                      <div
                        class="block__preview"
                        :style="{ 'background-image': `url(${item.img})` }"
                      ></div>
                    </div>
                    <div class="block-content">
                      <h2 class="block-title">{{ item.title }}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-tab-pane>
      <el-tab-pane label="属性" class="widget-collapse">
        <Setting />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import socket from '@/util/socket.js';
import Loading from '@/util/loading';
import { AppModule } from '@/store/modules/app';
import Setting from './Setting';
import Sortable from 'sortablejs';
export default {
  components: {
    Setting,
  },
  data() {
    return {
      search: '',
      widget: '组件',
      compList: [],
      activeNames: [0, 1, 2],
      blockNames: [0],
      staticBlockList: [],
      widgetData: {},
      editBlockList: [],
      editBlockActiveNames: [0, 1, 2]
    };
  },
  async created() {
    this.getWidgetList = _.debounce(this.getWidgetList, 500, { trailing: true });
    
    this.getWidgetList('');
    this.$root.$on('bind_client_drag', (data) => {
      this.bindClientDrag();
    });
    this.$root.$on('mousedown_widget', (data) => {
      this.widgetData = data;
    });
  },
  mounted() {
    window.addEventListener('message', event => {
      if (event.data.handler === 'webpack.update.success') {
        setTimeout(() => {
          this.bindDrag();
        }, 1000);
      }
    });

    setTimeout(() => {
      this.bindClientDrag();
    }, 3000);
    const iframe = document.querySelector('#viewContent');

    iframe.onload = () => {
      this.bindDrag();
    };
  },
  methods: {
    async addComp(id, config) {
      const params = {
        boxUuid: AppModule.boxUuid,
        id,
        params: config
      };
      Loading.open();
      await socket.emit('generator.scene.addComponent', params);
      Loading.close();
      this.dialogVisible = false;
    },

    mousedownWidget(widget, type) {
      this.widgetData = widget;
      this.widgetData.id = this.widgetData.key;
      this.widgetData.type = type;
    },

    handleChange() {
      // material.index.getBlocks
    },
    toggleWidget(value) {
      if (value === '静态区块') {
        this.getStaticBlock();
      }
      
      if (value === '编辑区块') {
        this.getEditBlockList();
      }
      this.bindClientDrag();
    },
    async getStaticBlock() {
      const blockList = await socket.emit('material.index.getBlocks');
      this.staticBlockList = blockList.list;
    },

    async getEditBlockList() {
      const blockList = await socket.emit('generator.data.getEditBlockList');
      this.editBlockList = blockList;
    },

    async addStaticBlock(id, originData) {
      Loading.open();
      await socket.emit('generator.scene.addBlock', {
        boxUuid: AppModule.boxUuid, 
        id,
        originData 
      });
    },
    bindDrag() {
      const iframe = document.querySelector('#viewContent');
      var doc = iframe.contentDocument;
      if (!doc) return;
      const list = doc.querySelectorAll('.drag-box');
      list.forEach(item => {
        Sortable.create(item, {
          group: {
            name: 'shared',
            pull: 'clone',
          },
          sort: false,
          onStart: event => {},
          onEnd: event => {

            const item = event.item;
            const compId = item.getAttribute('data-id');
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
    bindClientDrag () {

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
          // draggable: '',
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

            if (this.widgetData.type === 'block') {

              Loading.open();
              await socket.emit('generator.scene.addBlock', {
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
              await socket.emit('generator.scene.addComponent', params);
              Loading.close();
            }

          }
        });
      });

    },
    async getWidgetList (value) {
      const componentMap = await socket.emit('generator.data.getWidgetList', {value});
      this.compList = componentMap;
      this.bindClientDrag();
    },
    searchChange (value) {
      this.getWidgetList(value)
    },
    async dragViewWidget (compId, boxId, nextSiblingId) {
      await socket.emit('generator.scene.dragViewWidgetHandler', {
        compId,
        boxId,
        nextSiblingId,
      });

      setTimeout(() => {
        this.bindDrag();
      }, 500)
    }
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
  justify-content: center;
  align-items: center;
  padding: 10px 5px;
  border-right: 1px solid #d7d7d7;
  border-bottom: 1px solid #d7d7d7;
  box-sizing: border-box;
}
</style>
