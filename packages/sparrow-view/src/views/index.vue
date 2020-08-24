<template>
  <div class="home drag-box" data-id="347a1d8e">
    <box
      data-id="7a1d8e15"
      :uuid="'7a1d8e15'"
      class="block-item"
      :label="'Card'"
    >
      <div style="margin-bottom: 20px;">
        <el-card class="box-card" shadow="always" :body-style="{}">
          <div class="card-content drag-box" data-id="7a1d8e15">
            <box
              data-id="1d8e158a"
              :uuid="'1d8e158a'"
              class="block-item"
              :label="'Form'"
            >
              <div class="root">
                <box-form>
                  <el-form :inline="true" label-width="100px">
                    <div class="drag-box" data-id="1d8e158a">
                      <component-box uuid="8e158afa">
                        <el-form-item label=" ">
                          <edit-text-box
                            slot="label"
                            :clearClass="true"
                            uuid="8e158afa"
                          >
                            文本框
                          </edit-text-box>

                          <el-input />
                        </el-form-item>
                      </component-box>

                      <component-box uuid="158afad6">
                        <el-form-item label=" ">
                          <edit-text-box
                            slot="label"
                            :clearClass="true"
                            uuid="158afad6"
                          >
                            特殊资源
                          </edit-text-box>

                          <el-select>
                            <el-option
                              v-for="item in selectOptions158afad6"
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

            <component-box uuid="8afad6cc" :isInline="true">
              <el-button size="medium" type="primary" @click="handleCreate">
                <edit-text-box :clearClass="true" uuid="8afad6cc"
                  >添加</edit-text-box
                >
              </el-button>
            </component-box>

            <component-box uuid="fad6cc16" :isInline="true">
              <el-button size="medium" type="primary">
                <edit-text-box :clearClass="true" uuid="fad6cc16"
                  >搜索</edit-text-box
                >
              </el-button>
            </component-box>
          </div>
        </el-card>
      </div>
    </box>

    <box
      data-id="d6cc164c"
      :uuid="'d6cc164c'"
      class="block-item"
      :label="'Dialog'"
    >
      <div>
        <el-dialog width="70%" :visible.sync="dialogFormVisible">
          <edit-text-box slot="title" :clearClass="true" uuid="d6cc164c">
            添加
          </edit-text-box>
          <div class="dialog-content drag-box" data-id="d6cc164c">
            <box
              data-id="cc164c6f"
              :uuid="'cc164c6f'"
              class="block-item"
              :label="'Form'"
            >
              <div class="root">
                <box-form>
                  <el-form label-width="100px">
                    <div class="drag-box" data-id="cc164c6f">
                      <component-box uuid="164c6f3f">
                        <el-form-item label=" ">
                          <edit-text-box
                            slot="label"
                            :clearClass="true"
                            uuid="164c6f3f"
                          >
                            文本框
                          </edit-text-box>

                          <el-input />
                        </el-form-item>
                      </component-box>

                      <component-box uuid="4c6f3f2b">
                        <el-form-item label=" ">
                          <edit-text-box
                            slot="label"
                            :clearClass="true"
                            uuid="4c6f3f2b"
                          >
                            文本框
                          </edit-text-box>

                          <el-input type="textarea" rows="4" />
                        </el-form-item>
                      </component-box>

                      <component-box uuid="6f3f2b7b">
                        <el-form-item label=" ">
                          <edit-text-box
                            slot="label"
                            :clearClass="true"
                            uuid="6f3f2b7b"
                          >
                            文本框
                          </edit-text-box>

                          <el-autocomplete
                            :fetch-suggestions="querySearch6f3f2b7b"
                            @select="handleSelect6f3f2b7b"
                          />
                        </el-form-item>
                      </component-box>

                      <component-box uuid="3f2b7b49">
                        <el-form-item label=" ">
                          <edit-text-box
                            slot="label"
                            :clearClass="true"
                            uuid="3f2b7b49"
                          >
                            数字文本框
                          </edit-text-box>

                          <el-input-number :min="1" :max="10" />
                        </el-form-item>
                      </component-box>

                      <component-box uuid="2b7b4936" :isInline="true">
                        <el-button
                          size="medium"
                          type="primary"
                          :plain="true"
                          @click="dialogFormVisible = false"
                        >
                          <edit-text-box :clearClass="true" uuid="2b7b4936"
                            >取消</edit-text-box
                          >
                        </el-button>
                      </component-box>

                      <component-box uuid="7b493668" :isInline="true">
                        <el-button
                          size="medium"
                          type="primary"
                          @click="createData"
                        >
                          <edit-text-box :clearClass="true" uuid="7b493668"
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
      data-id="4936687a"
      :uuid="'4936687a'"
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
                    <edit-text-box uuid="7a2aa5a4" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="7a2aa5a4"
                      :uuid="'7a2aa5a4'"
                      class="block-item"
                      label="column"
                    >
                      {{ row.id }}
                      <div class="drag-box">
                        <div class="empty-container">empty</div>
                      </div>
                    </box>
                  </template>
                </el-table-column>

                <el-table-column label="Author">
                  <template slot="header" slot-scope="{ row, column, $index }">
                    <edit-text-box uuid="a5a4b780" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="a5a4b780"
                      :uuid="'a5a4b780'"
                      class="block-item"
                      label="column"
                    >
                      {{ row.author }}
                      <div class="drag-box">
                        <div class="empty-container">empty</div>
                      </div>
                    </box>
                  </template>
                </el-table-column>

                <el-table-column label="">
                  <template slot="header" slot-scope="{ row, column, $index }">
                    <edit-text-box uuid="b780f60a" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="b780f60a"
                      :uuid="'b780f60a'"
                      class="block-item"
                      label="column"
                    >
                      <div class="drag-box">
                        <div class="empty-container">empty</div>
                      </div>
                    </box>
                  </template>
                </el-table-column>

                <el-table-column label="">
                  <template slot="header" slot-scope="{ row, column, $index }">
                    <edit-text-box uuid="f60ab7a9" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="f60ab7a9"
                      :uuid="'f60ab7a9'"
                      class="block-item"
                      label="column"
                    >
                      <div class="drag-box">
                        <component-box uuid="0ab7a972" :isInline="true">
                          <el-tag size="medium" type="success" effect="light">
                            <edit-text-box :clearClass="true" uuid="0ab7a972"
                              >已发布</edit-text-box
                            >
                          </el-tag>
                        </component-box>

                        <component-box uuid="b7a9725a" :isInline="true">
                          <el-tag size="medium" type="warning" effect="light">
                            <edit-text-box :clearClass="true" uuid="b7a9725a"
                              >草稿</edit-text-box
                            >
                          </el-tag>
                        </component-box>
                      </div>
                    </box>
                  </template>
                </el-table-column>

                <el-table-column label="操作">
                  <template slot="header" slot-scope="{ row, column, $index }">
                    <edit-text-box uuid="725aa453" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="725aa453"
                      :uuid="'725aa453'"
                      class="block-item"
                      label="column"
                    >
                      <div class="drag-box">
                        <component-box uuid="5aa45353" :isInline="true">
                          <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete"
                          >
                            <edit-text-box :clearClass="true" uuid="5aa45353"
                              >删除</edit-text-box
                            >
                          </el-button>
                        </component-box>

                        <component-box uuid="a453538f" :isInline="true">
                          <el-button
                            size="mini"
                            type="primary"
                            @click="handleUpdate"
                          >
                            <edit-text-box :clearClass="true" uuid="a453538f"
                              >编辑</edit-text-box
                            >
                          </el-button>
                        </component-box>

                        <component-box uuid="53538fd2" :isInline="true">
                          <el-button
                            size="mini"
                            type="success"
                            @click="handleModifyStatus(row, 'published')"
                          >
                            <edit-text-box :clearClass="true" uuid="53538fd2"
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

    <component-box uuid="538fd271">
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </component-box>

    <box
      data-id="8fd27161"
      :uuid="'8fd27161'"
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

    querySearch6f3f2b7b(queryString, cb) {
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

    handleSelect6f3f2b7b(item) {
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

    dialogVisibleHandlerd6cc164c() {
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
      selectOptions158afad6: [
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
