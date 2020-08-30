<template>
  <div class="home drag-box" data-id="8ff33d7a">
    <div class="toggle" />

    <box
      data-id="f33d7afd"
      :uuid="'f33d7afd'"
      class="block-item"
      :label="'Card'"
    >
      <div style="margin-bottom: 20px;">
        <el-card class="box-card" shadow="always" :body-style="{}">
          <div class="card-content drag-box" data-id="f33d7afd">
            <box
              data-id="3d7afd9f"
              :uuid="'3d7afd9f'"
              class="block-item"
              :label="'Form'"
            >
              <div class="root">
                <box-form>
                  <el-form :inline="true" label-width="100px">
                    <div class="drag-box" data-id="3d7afd9f">
                      <component-box uuid="7afd9f6e">
                        <el-form-item label=" ">
                          <edit-text-box
                            slot="label"
                            :clearClass="true"
                            uuid="7afd9f6e"
                          >
                            文本框
                          </edit-text-box>

                          <el-input />
                        </el-form-item>
                      </component-box>

                      <component-box uuid="fd9f6ed7">
                        <el-form-item label=" ">
                          <edit-text-box
                            slot="label"
                            :clearClass="true"
                            uuid="fd9f6ed7"
                          >
                            特殊资源
                          </edit-text-box>

                          <el-select>
                            <el-option
                              v-for="item in selectOptionsfd9f6ed7"
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

            <component-box uuid="9f6ed7a1" :isInline="true">
              <el-button size="medium" type="primary" @click="handleCreate">
                <edit-text-box :clearClass="true" uuid="9f6ed7a1"
                  >添加</edit-text-box
                >
              </el-button>
            </component-box>

            <component-box uuid="6ed7a1d6" :isInline="true">
              <el-button size="medium" type="primary">
                <edit-text-box :clearClass="true" uuid="6ed7a1d6"
                  >搜索</edit-text-box
                >
              </el-button>
            </component-box>
          </div>
        </el-card>
      </div>
    </box>

    <box
      data-id="d7a1d689"
      :uuid="'d7a1d689'"
      class="block-item"
      :label="'Dialog'"
    >
      <div>
        <el-dialog width="70%" :visible.sync="dialogFormVisible">
          <edit-text-box slot="title" :clearClass="true" uuid="d7a1d689">
            添加
          </edit-text-box>
          <div class="dialog-content drag-box" data-id="d7a1d689">
            <box
              data-id="a1d6897c"
              :uuid="'a1d6897c'"
              class="block-item"
              :label="'Form'"
            >
              <div class="root">
                <box-form>
                  <el-form label-width="100px">
                    <div class="drag-box" data-id="a1d6897c">
                      <component-box uuid="d6897c59">
                        <el-form-item label=" ">
                          <edit-text-box
                            slot="label"
                            :clearClass="true"
                            uuid="d6897c59"
                          >
                            文本框
                          </edit-text-box>

                          <el-input />
                        </el-form-item>
                      </component-box>

                      <component-box uuid="897c592b">
                        <el-form-item label=" ">
                          <edit-text-box
                            slot="label"
                            :clearClass="true"
                            uuid="897c592b"
                          >
                            文本框
                          </edit-text-box>

                          <el-input type="textarea" rows="4" />
                        </el-form-item>
                      </component-box>

                      <component-box uuid="7c592be8">
                        <el-form-item label=" ">
                          <edit-text-box
                            slot="label"
                            :clearClass="true"
                            uuid="7c592be8"
                          >
                            文本框
                          </edit-text-box>

                          <el-autocomplete
                            :fetch-suggestions="querySearch7c592be8"
                            @select="handleSelect7c592be8"
                          />
                        </el-form-item>
                      </component-box>

                      <component-box uuid="592be82d">
                        <el-form-item label=" ">
                          <edit-text-box
                            slot="label"
                            :clearClass="true"
                            uuid="592be82d"
                          >
                            数字文本框
                          </edit-text-box>

                          <el-input-number :min="1" :max="10" />
                        </el-form-item>
                      </component-box>

                      <component-box uuid="2be82dde" :isInline="true">
                        <el-button
                          size="medium"
                          type="primary"
                          :plain="true"
                          @click="dialogFormVisible = false"
                        >
                          <edit-text-box :clearClass="true" uuid="2be82dde"
                            >取消</edit-text-box
                          >
                        </el-button>
                      </component-box>

                      <component-box uuid="e82dde15" :isInline="true">
                        <el-button
                          size="medium"
                          type="primary"
                          @click="createData"
                        >
                          <edit-text-box :clearClass="true" uuid="e82dde15"
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
      data-id="2dde1511"
      :uuid="'2dde1511'"
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
                    <edit-text-box uuid="11d6858f" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="11d6858f"
                      :uuid="'11d6858f'"
                      class="block-item"
                      label="column"
                    >
                      {{ row.id }}
                      <div class="drag-box" data-id="11d6858f">
                        <div class="empty-container">empty</div>
                      </div>
                    </box>
                  </template>
                </el-table-column>

                <el-table-column label="">
                  <template slot="header" slot-scope="{ row, column, $index }">
                    <edit-text-box uuid="4088c99d" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="4088c99d"
                      :uuid="'4088c99d'"
                      class="block-item"
                      label="column"
                    >
                      <div class="drag-box" data-id="4088c99d">
                        <div class="empty-container">empty</div>
                      </div>
                    </box>
                  </template>
                </el-table-column>

                <el-table-column label="">
                  <template slot="header" slot-scope="{ row, column, $index }">
                    <edit-text-box uuid="bb012270" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="bb012270"
                      :uuid="'bb012270'"
                      class="block-item"
                      label="column"
                    >
                      <div class="drag-box" data-id="bb012270">
                        <div class="empty-container">empty</div>
                      </div>
                    </box>
                  </template>
                </el-table-column>

                <el-table-column label="">
                  <template slot="header" slot-scope="{ row, column, $index }">
                    <edit-text-box uuid="2270f3ac" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="2270f3ac"
                      :uuid="'2270f3ac'"
                      class="block-item"
                      label="column"
                    >
                      <div class="drag-box" data-id="2270f3ac">
                        <component-box uuid="70f3ac56" :isInline="true">
                          <el-tag
                            size="medium"
                            type="success"
                            effect="light"
                            v-if="row.status === 'published'"
                          >
                            <edit-text-box :clearClass="true" uuid="70f3ac56">{{
                              row.status
                            }}</edit-text-box>
                          </el-tag>
                        </component-box>

                        <component-box uuid="f3ac56d2" :isInline="true">
                          <el-tag
                            size="medium"
                            type="warning"
                            effect="light"
                            v-if="row.status === 'draft'"
                          >
                            <edit-text-box :clearClass="true" uuid="f3ac56d2">{{
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
                    <edit-text-box uuid="56d2254c" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="56d2254c"
                      :uuid="'56d2254c'"
                      class="block-item"
                      label="column"
                    >
                      <div class="drag-box" data-id="56d2254c">
                        <component-box uuid="254c239e" :isInline="true">
                          <el-button
                            size="mini"
                            type="primary"
                            @click="handleUpdate"
                          >
                            <edit-text-box :clearClass="true" uuid="254c239e"
                              >编辑</edit-text-box
                            >
                          </el-button>
                        </component-box>

                        <component-box uuid="4c239e8c" :isInline="true">
                          <el-button
                            size="mini"
                            type="success"
                            @click="handleModifyStatus(row, 'published')"
                          >
                            <edit-text-box :clearClass="true" uuid="4c239e8c"
                              >发布</edit-text-box
                            >
                          </el-button>
                        </component-box>
                      </div>
                    </box>
                  </template>
                </el-table-column>

                <el-table-column label="">
                  <template slot="header" slot-scope="{ row, column, $index }">
                    <edit-text-box uuid="0596b5e7" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="0596b5e7"
                      :uuid="'0596b5e7'"
                      class="block-item"
                      label="column"
                    >
                      <div class="drag-box" data-id="0596b5e7">
                        <component-box uuid="96b5e768" :isInline="true">
                          <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete"
                          >
                            <edit-text-box :clearClass="true" uuid="96b5e768"
                              >删除</edit-text-box
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

    <component-box uuid="239e8c05">
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </component-box>

    <box
      data-id="9e8c0596"
      :uuid="'9e8c0596'"
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

    querySearch7c592be8(queryString, cb) {
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

    handleSelect7c592be8(item) {
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

    dialogVisibleHandlerd7a1d689() {
      this.dialogVisible = !this.dialogVisible;
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

    handleDelete(row, index) {
      this.$notify({
        title: "Success",
        message: "Delete Successfully",
        type: "success",
        duration: 2000
      });
      this.list.splice(index, 1);
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
      selectOptionsfd9f6ed7: [
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
