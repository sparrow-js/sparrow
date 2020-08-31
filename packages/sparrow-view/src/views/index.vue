<template>
  <div class="home drag-box" data-id="eee1c362">
    <box
      data-id="e1c36239"
      :uuid="'e1c36239'"
      class="block-item"
      :label="'Card'"
    >
      <div style="margin-bottom: 20px;">
        <el-card class="box-card" shadow="always" :body-style="{}">
          <div class="card-content drag-box" data-id="e1c36239">
            <box
              data-id="c36239c9"
              :uuid="'c36239c9'"
              class="block-item"
              :label="'Form'"
            >
              <div class="root">
                <box-form>
                  <el-form :inline="true" label-width="100px">
                    <div class="drag-box" data-id="c36239c9">
                      <component-box uuid="6239c968">
                        <el-form-item label=" ">
                          <edit-text-box
                            slot="label"
                            :clearClass="true"
                            uuid="6239c968"
                          >
                            文本框
                          </edit-text-box>

                          <el-input />
                        </el-form-item>
                      </component-box>

                      <component-box uuid="39c968eb">
                        <el-form-item label=" ">
                          <edit-text-box
                            slot="label"
                            :clearClass="true"
                            uuid="39c968eb"
                          >
                            特殊资源
                          </edit-text-box>

                          <el-select>
                            <el-option
                              v-for="item in selectOptions39c968eb"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            >
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </component-box>
                    </div>
                  </el-form>
                </box-form>
              </div>
            </box>

            <component-box uuid="c968eb89" :isInline="true">
              <el-button size="medium" type="primary" @click="handleCreate">
                <edit-text-box :clearClass="true" uuid="c968eb89"
                  >添加</edit-text-box
                >
              </el-button>
            </component-box>

            <component-box uuid="68eb89c8" :isInline="true">
              <el-button size="medium" type="primary">
                <edit-text-box :clearClass="true" uuid="68eb89c8"
                  >搜索</edit-text-box
                >
              </el-button>
            </component-box>
          </div>
        </el-card>
      </div>
    </box>

    <box
      data-id="eb89c846"
      :uuid="'eb89c846'"
      class="block-item"
      :label="'Dialog'"
    >
      <div>
        <el-dialog width="70%" :visible.sync="dialogFormVisible">
          <edit-text-box slot="title" :clearClass="true" uuid="eb89c846">
            添加
          </edit-text-box>
          <div class="dialog-content drag-box" data-id="eb89c846">
            <box
              data-id="89c84668"
              :uuid="'89c84668'"
              class="block-item"
              :label="'Form'"
            >
              <div class="root">
                <box-form>
                  <el-form label-width="100px">
                    <div class="drag-box" data-id="89c84668">
                      <component-box uuid="c84668b5">
                        <el-form-item label=" ">
                          <edit-text-box
                            slot="label"
                            :clearClass="true"
                            uuid="c84668b5"
                          >
                            文本框
                          </edit-text-box>

                          <el-input />
                        </el-form-item>
                      </component-box>

                      <component-box uuid="4668b57d">
                        <el-form-item label=" ">
                          <edit-text-box
                            slot="label"
                            :clearClass="true"
                            uuid="4668b57d"
                          >
                            文本框
                          </edit-text-box>

                          <el-input type="textarea" rows="4" />
                        </el-form-item>
                      </component-box>

                      <component-box uuid="68b57d7e">
                        <el-form-item label=" ">
                          <edit-text-box
                            slot="label"
                            :clearClass="true"
                            uuid="68b57d7e"
                          >
                            文本框
                          </edit-text-box>

                          <el-autocomplete
                            :fetch-suggestions="querySearch68b57d7e"
                            @select="handleSelect68b57d7e"
                          />
                        </el-form-item>
                      </component-box>

                      <component-box uuid="b57d7e37">
                        <el-form-item label=" ">
                          <edit-text-box
                            slot="label"
                            :clearClass="true"
                            uuid="b57d7e37"
                          >
                            数字文本框
                          </edit-text-box>

                          <el-input-number :min="1" :max="10" />
                        </el-form-item>
                      </component-box>

                      <component-box uuid="7d7e37f0" :isInline="true">
                        <el-button
                          size="medium"
                          type="primary"
                          :plain="true"
                          @click="dialogFormVisible = false"
                        >
                          <edit-text-box :clearClass="true" uuid="7d7e37f0"
                            >取消</edit-text-box
                          >
                        </el-button>
                      </component-box>

                      <component-box uuid="7e37f0c3" :isInline="true">
                        <el-button
                          size="medium"
                          type="primary"
                          @click="createData"
                        >
                          <edit-text-box :clearClass="true" uuid="7e37f0c3"
                            >确定</edit-text-box
                          >
                        </el-button>
                      </component-box>
                    </div>
                  </el-form>
                </box-form>
              </div>
            </box>
          </div>
        </el-dialog>
      </div>
    </box>

    <box
      data-id="37f0c335"
      :uuid="'37f0c335'"
      class="block-item"
      :label="'Table'"
    >
      <div class="box">
        <template>
          <div class="root">
            <table-box>
              <el-table :border="true" style="width: 100%" :data="list">
                <el-table-column label="ID">
                  <template slot="header" slot-scope="{ row, column, $index }">
                    <edit-text-box uuid="3520c52e" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="3520c52e"
                      :uuid="'3520c52e'"
                      class="block-item"
                      label="column"
                    >
                      {{ row.id }}
                      <div class="drag-box" data-id="3520c52e">
                        <div class="empty-container">empty</div>
                      </div>
                    </box>
                  </template>
                </el-table-column>

                <el-table-column label="Author">
                  <template slot="header" slot-scope="{ row, column, $index }">
                    <edit-text-box uuid="c52ebac6" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="c52ebac6"
                      :uuid="'c52ebac6'"
                      class="block-item"
                      label="column"
                    >
                      {{ row.author }}
                      <div class="drag-box" data-id="c52ebac6">
                        <div class="empty-container">empty</div>
                      </div>
                    </box>
                  </template>
                </el-table-column>

                <el-table-column label="">
                  <template slot="header" slot-scope="{ row, column, $index }">
                    <edit-text-box uuid="bac6d90d" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="bac6d90d"
                      :uuid="'bac6d90d'"
                      class="block-item"
                      label="column"
                    >
                      <div class="drag-box" data-id="bac6d90d">
                        <div class="empty-container">empty</div>
                      </div>
                    </box>
                  </template>
                </el-table-column>

                <el-table-column label="Status">
                  <template slot="header" slot-scope="{ row, column, $index }">
                    <edit-text-box uuid="d90dea21" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="d90dea21"
                      :uuid="'d90dea21'"
                      class="block-item"
                      label="column"
                    >
                      <div class="drag-box" data-id="d90dea21">
                        <component-box uuid="0dea21f5" :isInline="true">
                          <el-tag
                            size="medium"
                            type="success"
                            effect="light"
                            v-if="row.status === 'published'"
                          >
                            <edit-text-box :clearClass="true" uuid="0dea21f5">{{
                              row.status
                            }}</edit-text-box>
                          </el-tag>
                        </component-box>

                        <component-box uuid="ea21f5fc" :isInline="true">
                          <el-tag
                            size="medium"
                            type="warning"
                            effect="light"
                            v-if="row.status === 'draft'"
                          >
                            <edit-text-box :clearClass="true" uuid="ea21f5fc">{{
                              row.status
                            }}</edit-text-box>
                          </el-tag>
                        </component-box>
                      </div>
                    </box>
                  </template>
                </el-table-column>

                <el-table-column label="操作">
                  <template slot="header" slot-scope="{ row, column, $index }">
                    <edit-text-box uuid="f5fc6f99" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="f5fc6f99"
                      :uuid="'f5fc6f99'"
                      class="block-item"
                      label="column"
                    >
                      <div class="drag-box" data-id="f5fc6f99">
                        <component-box uuid="fc6f999b" :isInline="true">
                          <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete"
                          >
                            <edit-text-box :clearClass="true" uuid="fc6f999b"
                              >删除</edit-text-box
                            >
                          </el-button>
                        </component-box>

                        <component-box uuid="6f999be4" :isInline="true">
                          <el-button
                            size="mini"
                            type="primary"
                            @click="handleUpdate"
                          >
                            <edit-text-box :clearClass="true" uuid="6f999be4"
                              >编辑</edit-text-box
                            >
                          </el-button>
                        </component-box>

                        <component-box uuid="999be457" :isInline="true">
                          <el-button
                            size="mini"
                            type="success"
                            @click="handleModifyStatus(row, 'published')"
                          >
                            <edit-text-box :clearClass="true" uuid="999be457"
                              >发布</edit-text-box
                            >
                          </el-button>
                        </component-box>
                      </div>
                    </box>
                  </template>
                </el-table-column>
              </el-table>
            </table-box>
          </div>
        </template>
      </div>
    </box>

    <component-box uuid="9be45741">
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </component-box>

    <box
      data-id="e4574100"
      :uuid="'e4574100'"
      class="block-item"
      :label="'ComplexTable'"
    >
      <div />
    </box>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

import { fetchList, createArticle, updateArticle } from "@/api/article";
export default {
  created() {
    this.getList();
  },

  components: {
    Pagination
  },
  methods: {
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: "",
        timestamp: new Date(),
        title: "",
        status: "published",
        type: ""
      };
    },

    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },

    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },

    querySearch68b57d7e(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants; // 调用 callback 返回建议列表的数据

      cb(results);
    },

    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },

    handleSelect68b57d7e(item) {
      console.log(item);
    },

    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024; // mock a id

          this.temp.author = "sparrow";
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "Created Successfully",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },

    dialogVisibleHandlereb89c846() {
      this.dialogVisible = !this.dialogVisible;
    },

    handleDelete(row, index) {
      this.$notify({
        title: "Success",
        message: "Delete Successfully",
        type: "success",
        duration: 2000
      });
      this.list.splice(index, 1);
    },

    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj

      this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },

    handleModifyStatus(row, status) {
      this.$message({
        message: "操作Success",
        type: "success"
      });
      row.status = status;
    },

    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.total = response.data.total; // Just to simulate the time of the request

        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    }
  },

  data() {
    return {
      selectOptions39c968eb: [
        {
          value: "选项1",
          label: "选项1"
        },
        {
          value: "选项2",
          label: "选项2"
        },
        {
          value: "选项3",
          label: "选项3"
        }
      ],
      temp: {
        id: undefined,
        importance: 1,
        remark: "",
        timestamp: new Date(),
        title: "",
        type: "",
        status: "published"
      },
      dialogFormVisible: false,
      restaurants: [
        {
          value: "三全鲜食（北新泾店）",
          address: "长宁区新渔路144号"
        },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号"
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
        }
      ],
      state1: "",
      dialogVisible: false,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      },
      dialogStatus: "",
      dialogPvVisible: false,
      downloadLoading: false
    };
  }
};
</script>
<style lang="scss" scoped></style>
