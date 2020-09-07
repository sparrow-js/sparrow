<template>
  <div class="home drag-box" data-id="0dabd663">
    <box
      data-id="abd66362"
      :uuid="'abd66362'"
      class="block-item"
      :label="'Card'"
    >
      <div style="margin-bottom: 20px;">
        <el-card class="box-card" shadow="always" :body-style="{}">
          <div class="card-content drag-box" data-id="abd66362">
            <box
              data-id="d6636241"
              :uuid="'d6636241'"
              class="block-item"
              :label="'Form'"
            >
              <div class="root">
                <box-form>
                  <el-form :inline="true" label-width="100px">
                    <div class="drag-box" data-id="d6636241">
                      <component-box uuid="636241c7">
                        <el-form-item label=" ">
                          <edit-text-box
                            slot="label"
                            :clearClass="true"
                            uuid="636241c7"
                          >
                            文本框
                          </edit-text-box>

                          <el-input />
                        </el-form-item>
                      </component-box>

                      <component-box uuid="6241c7cf">
                        <el-form-item label=" ">
                          <edit-text-box
                            slot="label"
                            :clearClass="true"
                            uuid="6241c7cf"
                          >
                            特殊资源
                          </edit-text-box>

                          <el-select>
                            <el-option
                              v-for="item in selectOptions6241c7cf"
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
          </div>
        </el-card>
      </div>
    </box>

    <box
      data-id="cfcf47b7"
      :uuid="'cfcf47b7'"
      class="block-item"
      :label="'Dialog'"
    >
      <div>
        <el-dialog width="70%" :visible.sync="dialogFormVisible">
          <edit-text-box slot="title" :clearClass="true" uuid="cfcf47b7">
            添加
          </edit-text-box>
          <div class="dialog-content drag-box" data-id="cfcf47b7">
            <box
              data-id="cf47b7c6"
              :uuid="'cf47b7c6'"
              class="block-item"
              :label="'Form'"
            >
              <div class="root">
                <box-form>
                  <el-form label-width="100px">
                    <div class="drag-box" data-id="cf47b7c6">
                      <component-box uuid="47b7c634">
                        <el-form-item label=" ">
                          <edit-text-box
                            slot="label"
                            :clearClass="true"
                            uuid="47b7c634"
                          >
                            文本框
                          </edit-text-box>

                          <el-input />
                        </el-form-item>
                      </component-box>

                      <component-box uuid="b7c63453">
                        <el-form-item label=" ">
                          <edit-text-box
                            slot="label"
                            :clearClass="true"
                            uuid="b7c63453"
                          >
                            文本框
                          </edit-text-box>

                          <el-input type="textarea" rows="4" />
                        </el-form-item>
                      </component-box>

                      <component-box uuid="c6345314">
                        <el-form-item label=" ">
                          <edit-text-box
                            slot="label"
                            :clearClass="true"
                            uuid="c6345314"
                          >
                            文本框
                          </edit-text-box>

                          <el-autocomplete
                            :fetch-suggestions="querySearchc6345314"
                            @select="handleSelectc6345314"
                          />
                        </el-form-item>
                      </component-box>

                      <component-box uuid="34531436">
                        <el-form-item label=" ">
                          <edit-text-box
                            slot="label"
                            :clearClass="true"
                            uuid="34531436"
                          >
                            数字文本框
                          </edit-text-box>

                          <el-input-number :min="1" :max="10" />
                        </el-form-item>
                      </component-box>

                      <component-box uuid="53143678" :isInline="true">
                        <el-button
                          size="medium"
                          type="primary"
                          :plain="true"
                          @click="dialogFormVisible = false"
                        >
                          <edit-text-box :clearClass="true" uuid="53143678"
                            >取消</edit-text-box
                          >
                        </el-button>
                      </component-box>

                      <component-box uuid="143678a9" :isInline="true">
                        <el-button
                          size="medium"
                          type="primary"
                          @click="createData"
                        >
                          <edit-text-box :clearClass="true" uuid="143678a9"
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
      data-id="3678a9fa"
      :uuid="'3678a9fa'"
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
                    <edit-text-box uuid="a9fa0d79" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="a9fa0d79"
                      :uuid="'a9fa0d79'"
                      class="block-item"
                      label="column"
                    >
                      {{ row.id }}
                      <div class="drag-box" data-id="a9fa0d79">
                        <div class="empty-container">empty</div>
                      </div>
                    </box>
                  </template>
                </el-table-column>

                <el-table-column label="Author">
                  <template slot="header" slot-scope="{ row, column, $index }">
                    <edit-text-box uuid="fa0d79a8" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="fa0d79a8"
                      :uuid="'fa0d79a8'"
                      class="block-item"
                      label="column"
                    >
                      {{ row.author }}
                      <div class="drag-box" data-id="fa0d79a8">
                        <div class="empty-container">empty</div>
                      </div>
                    </box>
                  </template>
                </el-table-column>

                <el-table-column label="">
                  <template slot="header" slot-scope="{ row, column, $index }">
                    <edit-text-box uuid="0d79a83a" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="0d79a83a"
                      :uuid="'0d79a83a'"
                      class="block-item"
                      label="column"
                    >
                      <div class="drag-box" data-id="0d79a83a">
                        <div class="empty-container">empty</div>
                      </div>
                    </box>
                  </template>
                </el-table-column>

                <el-table-column label="">
                  <template slot="header" slot-scope="{ row, column, $index }">
                    <edit-text-box uuid="79a83a4a" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="79a83a4a"
                      :uuid="'79a83a4a'"
                      class="block-item"
                      label="column"
                    >
                      <div class="drag-box" data-id="79a83a4a">
                        <component-box uuid="a83a4a9e" :isInline="true">
                          <el-tag
                            size="medium"
                            type="success"
                            effect="light"
                            v-if="row.status === 'published'"
                          >
                            <edit-text-box :clearClass="true" uuid="a83a4a9e">{{
                              row.status
                            }}</edit-text-box>
                          </el-tag>
                        </component-box>

                        <component-box uuid="3a4a9ea8" :isInline="true">
                          <el-tag
                            size="medium"
                            type="warning"
                            effect="light"
                            v-if="row.status === 'draft'"
                          >
                            <edit-text-box :clearClass="true" uuid="3a4a9ea8">{{
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
                    <edit-text-box uuid="4a9ea89b" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="4a9ea89b"
                      :uuid="'4a9ea89b'"
                      class="block-item"
                      label="column"
                    >
                      <div class="drag-box" data-id="4a9ea89b">
                        <component-box uuid="9ea89bf3" :isInline="true">
                          <el-button
                            size="mini"
                            type="warning"
                            @click="handleDelete"
                          >
                            <edit-text-box :clearClass="true" uuid="9ea89bf3"
                              >删除</edit-text-box
                            >
                          </el-button>
                        </component-box>

                        <component-box uuid="a89bf365" :isInline="true">
                          <el-button
                            size="mini"
                            type="primary"
                            @click="handleUpdate"
                          >
                            <edit-text-box :clearClass="true" uuid="a89bf365"
                              >编辑</edit-text-box
                            >
                          </el-button>
                        </component-box>

                        <component-box uuid="9bf365f4" :isInline="true">
                          <el-button
                            size="mini"
                            type="success"
                            @click="handleModifyStatus(row, 'published')"
                          >
                            <edit-text-box :clearClass="true" uuid="9bf365f4"
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

    <component-box uuid="f365f494">
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </component-box>

    <box
      data-id="65f4944d"
      :uuid="'65f4944d'"
      class="block-item"
      :label="'ComplexTable'"
    >
      <div />
    </box>

    <div />
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
    querySearchc6345314(queryString, cb) {
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

    handleSelectc6345314(item) {
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

    dialogVisibleHandlercfcf47b7() {
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
    },

    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    }
  },

  data() {
    return {
      selectOptions6241c7cf: [
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
      dialogFormVisible: false,
      dialogStatus: "",
      dialogPvVisible: false,
      downloadLoading: false
    };
  }
};
</script>
<style lang="scss" scoped></style>
