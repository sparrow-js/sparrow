<template>
  <div class="home drag-box" data-id="7a129dde">
    <div class="root">
      <!-- <div class="tool-box">
        <el-button type="primary" size="mini">swagger(待开发)</el-button>
      </div> -->
      <div>
        <el-tag 
          v-for="(item, index) in quickList"
          :key="index"
          @click="addQuick(item)"
        >{{item.label}}</el-tag>
      </div>
      <el-table :border="true" style="width: 100%" :data="list">
        <el-table-column label="url">
          <template slot-scope="{ row, column, $index }">
            <div class="drag-box">
              <div class="drag-box" v-if="row.editable">
                <el-input closable="true" size="small" v-model="row.url" />
              </div>

              <div class="drag-box" v-if="!row.editable">
                <div>{{ row.url }}</div>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="方法名">
          <template slot-scope="{ row, column, $index }">
            <div class="drag-box">
              <div class="drag-box" v-if="row.editable">
                <el-input closable="true" size="small" v-model="row.methodName" />
              </div>

              <div class="drag-box" v-if="!row.editable">
                <div>{{ row.methodName }}</div>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="请求方式">
          <template slot-scope="{ row, column, $index }">
            <div class="drag-box">
              <div class="drag-box" v-if="row.editable">
                <el-radio-group v-model="row.methodType">
                  <el-radio
                    v-for="item in radionboxOptions"
                    :key="item.value"
                    :label="item.label"
                  />
                </el-radio-group>
              </div>

              <div class="drag-box" v-if="!row.editable">
                <p class="s-typography">
                  文本框
                </p>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="tool">
          <template slot-scope="{ row, column, $index }">
            <div class="drag-box">
              <div class="drag-box" v-if="row.editable">
                <div class="drag-box" v-if="row.isNew">
                  <el-button 
                    size="mini" 
                    type="primary" 
                    @click="saveRow(row, $index)">
                    添加
                  </el-button>

                  <el-popconfirm
                    title="确定删除吗？"
                    @onConfirm="remove(row.id, $index)"
                  >
                    <el-button slot="reference" size="mini" type="danger">
                      删除
                    </el-button>
                  </el-popconfirm>
                </div>

                <div class="drag-box" v-if="!row.isNew">
                  <el-button
                    size="mini"
                    type="success"
                    @click="saveRow(row, $index)"
                  >
                    保存
                  </el-button>

                  <el-button size="mini" type="warning" @click="cancel(row.id)">
                    取消
                  </el-button>
                </div>
              </div>

              <div class="drag-box" v-if="!row.editable">
                <el-button size="mini" type="primary" @click="toggle(row.id)">
                  编辑
                </el-button>

                <el-popconfirm
                  title="确定删除吗？"
                  @onConfirm="remove(row.id, $index)"
                >
                  <el-button slot="reference" size="mini" type="danger">
                    删除
                  </el-button>
                </el-popconfirm>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div />

    <el-button
      size="medium"
      icon="el-icon-plus"
      style="width: 100%;margin-top: 10px;"
      @click="newMember"
    >
      新增
    </el-button>

    <div />
  </div>
</template>

<script>
import Message from '@/util/MessageWorker';
import _ from 'lodash';
import { AppModule } from '@/store/modules/app';

export default {
  data() {
    return {
      radionboxOptions: [
        {
          value: "get",
          label: "get"
        },
        {
          value: "post",
          label: "post"
        }
      ],
      quickList: [
        {
          url: '',
          methodName: 'getList',
          label: '获取列表',
          methodType: 'get',
          apiType: 'getList'
        }
      ],
      list: [],
      listLoading: true,
      tableItem: {
        url: '',
        methodName: '',
        methodType: 'get'
      }
    };
  },

  created() {
    this.fetchData();
  },

  components: {},
  methods: {
    async saveRow(row, index) {
      this.listLoading = true;
      const { id, url, methodName, methodType } = row;

      if (!methodName || !url) {
        this.listLoading = false;
        this.$message.error("请填写完整信息。");
        return;
      } // 模拟网络请求、卡顿 800ms
      const res = await Message.emit('generator.scene.handlerApi', {
        uuid: AppModule.selecedFileInfo.uuid,
        data: {
          handler: 'save',
          ...row
        }
      });
      const cur = this.list[index];

      cur.editable = false;
      cur.isNew = false;
      cur.id = res.data.id;
      this.list.splice(index, 1, cur);
      this.listLoading = false;
    },

    async remove(id, index) {
      if (id) {
        const res = await socket.emit('generator.scene.handlerApi', {
          uuid: AppModule.selecedFileInfo.uuid,
          data: {
            handler: 'delete',
            id
          }
        });
        const newData = this.list.filter(item => item.id !== id);
        this.list = newData;
      } else {
        this.list.splice(index, 1);
      }
    },

    cancel(id) {
      const target = this.list.find(item => item.id === id);
      Object.keys(target).forEach(key => {
        target[key] = target._originalData[key];
      });
      target._originalData = undefined;
    },

    toggle(id) {
      const target = this.list.find(item => item.id === id);
      target._originalData = { ...target };
      target.editable = !target.editable;
    },

    async fetchData() {
      this.listLoading = true;
      const res = await Message.emit('generator.scene.handlerApi', {
        uuid: AppModule.selecedFileInfo.uuid,
        data: {
          handler: 'getList'
        }
      });

      this.list = res.list.map(item => {
        item.editable = false;
        return item;
      });
      this.listLoading = false;
    },

    newMember() {
      const item = Object.assign(_.cloneDeep(this.tableItem), {
        editable: true,
        isNew: true
      });
      this.list.push(item);
    },

    addQuick(quickItem) {
      const item = Object.assign(_.cloneDeep(quickItem), {
        editable: true,
        isNew: true
      });

      this.list.push(item);
    }
  },
};
</script>
<style lang="scss" scoped></style>
