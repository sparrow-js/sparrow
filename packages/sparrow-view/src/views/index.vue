<template>
  <div class="home drag-box" data-id="497344aa">
    <box
      data-id="7344aa90"
      :uuid="'7344aa90'"
      class="block-item"
      :label="'Card'"
    >
      <div style="margin-bottom: 20px;">
        <el-card class="box-card" shadow="always" :body-style="{}">
          <div class="card-content drag-box" data-id="7344aa90">
            <box
              data-id="44aa9065"
              :uuid="'44aa9065'"
              class="block-item"
              :label="'Form'"
            >
              <div class="root">
                <box-form>
                  <el-form :inline="true" label-width="100px">
                    <div class="drag-box" data-id="44aa9065">
                      <component-box uuid="aa9065e6">
                        <el-form-item label=" ">
                          <edit-text-box
                            slot="label"
                            :clearClass="true"
                            uuid="aa9065e6"
                          >
                            文本框
                          </edit-text-box>

                          <el-input />
                        </el-form-item>
                      </component-box>

                      <component-box uuid="9065e6c0">
                        <el-form-item label=" ">
                          <edit-text-box
                            slot="label"
                            :clearClass="true"
                            uuid="9065e6c0"
                          >
                            特殊资源
                          </edit-text-box>

                          <el-select>
                            <el-option
                              v-for="item in selectOptions9065e6c0"
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

            <component-box uuid="65e6c068" :isInline="true">
              <el-button size="medium" type="primary" @click="handleCreate">
                <edit-text-box :clearClass="true" uuid="65e6c068"
                  >添加</edit-text-box
                >
              </el-button>
            </component-box>

            <component-box uuid="e6c0680f" :isInline="true">
              <el-button size="medium" type="primary">
                <edit-text-box :clearClass="true" uuid="e6c0680f"
                  >搜索</edit-text-box
                >
              </el-button>
            </component-box>
          </div>
        </el-card>
      </div>
    </box>

    <box
      data-id="c0680f38"
      :uuid="'c0680f38'"
      class="block-item"
      :label="'Dialog'"
    >
      <div>
        <el-dialog width="70%" :visible.sync="dialogFormVisible">
          <edit-text-box slot="title" :clearClass="true" uuid="c0680f38">
            添加
          </edit-text-box>
          <div class="dialog-content drag-box" data-id="c0680f38">
            <box
              data-id="680f3872"
              :uuid="'680f3872'"
              class="block-item"
              :label="'Form'"
            >
              <div class="root">
                <box-form>
                  <el-form label-width="100px">
                    <div class="drag-box" data-id="680f3872">
                      <component-box uuid="0f3872c2">
                        <el-form-item label=" ">
                          <edit-text-box
                            slot="label"
                            :clearClass="true"
                            uuid="0f3872c2"
                          >
                            文本框
                          </edit-text-box>

                          <el-input />
                        </el-form-item>
                      </component-box>

                      <component-box uuid="3872c262">
                        <el-form-item label=" ">
                          <edit-text-box
                            slot="label"
                            :clearClass="true"
                            uuid="3872c262"
                          >
                            文本框
                          </edit-text-box>

                          <el-input type="textarea" rows="4" />
                        </el-form-item>
                      </component-box>

                      <component-box uuid="72c26213">
                        <el-form-item label=" ">
                          <edit-text-box
                            slot="label"
                            :clearClass="true"
                            uuid="72c26213"
                          >
                            文本框
                          </edit-text-box>

                          <el-autocomplete
                            :fetch-suggestions="querySearch72c26213"
                            @select="handleSelect72c26213"
                          />
                        </el-form-item>
                      </component-box>

                      <component-box uuid="c2621376">
                        <el-form-item label=" ">
                          <edit-text-box
                            slot="label"
                            :clearClass="true"
                            uuid="c2621376"
                          >
                            数字文本框
                          </edit-text-box>

                          <el-input-number :min="1" :max="10" />
                        </el-form-item>
                      </component-box>

                      <component-box uuid="62137668" :isInline="true">
                        <el-button
                          size="medium"
                          type="primary"
                          :plain="true"
                          @click="dialogFormVisible = false"
                        >
                          <edit-text-box :clearClass="true" uuid="62137668"
                            >取消</edit-text-box
                          >
                        </el-button>
                      </component-box>

                      <component-box uuid="1376682c" :isInline="true">
                        <el-button
                          size="medium"
                          type="primary"
                          @click="createData"
                        >
                          <edit-text-box :clearClass="true" uuid="1376682c"
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
      data-id="76682cf7"
      :uuid="'76682cf7'"
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
                    <edit-text-box uuid="2cf7fa16" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="2cf7fa16"
                      :uuid="'2cf7fa16'"
                      class="block-item"
                      label="column"
                    >
                      {{ row.id }}
                      <div class="drag-box" data-id="2cf7fa16">
                        <div class="empty-container">empty</div>
                      </div>
                    </box>
                  </template>
                </el-table-column>

                <el-table-column label="Author">
                  <template slot="header" slot-scope="{ row, column, $index }">
                    <edit-text-box uuid="f7fa1642" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="f7fa1642"
                      :uuid="'f7fa1642'"
                      class="block-item"
                      label="column"
                    >
                      {{ row.author }}
                      <div class="drag-box" data-id="f7fa1642">
                        <div class="empty-container">empty</div>
                      </div>
                    </box>
                  </template>
                </el-table-column>

                <el-table-column label="">
                  <template slot="header" slot-scope="{ row, column, $index }">
                    <edit-text-box uuid="fa16420d" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="fa16420d"
                      :uuid="'fa16420d'"
                      class="block-item"
                      label="column"
                    >
                      <div class="drag-box" data-id="fa16420d">
                        <div class="empty-container">empty</div>
                      </div>
                    </box>
                  </template>
                </el-table-column>

                <el-table-column label="">
                  <template slot="header" slot-scope="{ row, column, $index }">
                    <edit-text-box uuid="16420d03" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="16420d03"
                      :uuid="'16420d03'"
                      class="block-item"
                      label="column"
                    >
                      <div class="drag-box" data-id="16420d03">
                        <component-box uuid="420d038e" :isInline="true">
                          <el-tag
                            size="medium"
                            type="success"
                            effect="light"
                            v-if="row.status === 'published'"
                          >
                            <edit-text-box :clearClass="true" uuid="420d038e">{{
                              row.status
                            }}</edit-text-box>
                          </el-tag>
                        </component-box>

                        <component-box uuid="0d038ead" :isInline="true">
                          <el-tag
                            size="medium"
                            type="warning"
                            effect="light"
                            v-if="row.status === 'draft'"
                          >
                            <edit-text-box :clearClass="true" uuid="0d038ead">{{
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
                    <edit-text-box uuid="038eada5" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="038eada5"
                      :uuid="'038eada5'"
                      class="block-item"
                      label="column"
                    >
                      <div class="drag-box" data-id="038eada5">
                        <component-box uuid="8eada549" :isInline="true">
                          <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete"
                          >
                            <edit-text-box :clearClass="true" uuid="8eada549"
                              >删除</edit-text-box
                            >
                          </el-button>
                        </component-box>

                        <component-box uuid="ada5494e" :isInline="true">
                          <el-button
                            size="mini"
                            type="primary"
                            @click="handleUpdate"
                          >
                            <edit-text-box :clearClass="true" uuid="ada5494e"
                              >编辑</edit-text-box
                            >
                          </el-button>
                        </component-box>

                        <component-box uuid="a5494ed9" :isInline="true">
                          <el-button
                            size="mini"
                            type="success"
                            @click="handleModifyStatus(row, 'published')"
                          >
                            <edit-text-box :clearClass="true" uuid="a5494ed9"
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

    <component-box uuid="494ed92b">
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </component-box>

    <box
      data-id="4ed92bb8"
      :uuid="'4ed92bb8'"
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

    querySearch72c26213(queryString, cb) {
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

    handleSelect72c26213(item) {
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

    dialogVisibleHandlerc0680f38() {
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
      selectOptions9065e6c0: [
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
