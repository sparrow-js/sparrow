<template>
  <div class="home drag-box" data-id="47307ccd">
    <div style="margin-bottom: 20px;">
      <el-card class="box-card" shadow="always" :body-style="{}">
        <div class="card-content drag-box">
          <div class="root">
            <el-form :inline="true" label-width="100px" class="drag-box">
              <el-form-item label="文本框">
                <el-input />
              </el-form-item>

              <el-form-item label="特殊资源">
                <el-select>
                  <el-option
                    v-for="item in selectOptionseb27597d"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>

          <el-button size="medium" type="primary" @click="handleCreate">
            添加
          </el-button>

          <el-button size="medium" type="primary">
            搜索
          </el-button>
        </div>
      </el-card>
    </div>

    <div>
      <el-dialog width="70%" :visible.sync="dialogFormVisible">
        <edit-text-box slot="title" :clearClass="true" uuid="7d4c1dac">
          添加
        </edit-text-box>
        <div class="dialog-content drag-box" data-id="7d4c1dac">
          <div class="root">
            <el-form label-width="100px" class="drag-box">
              <el-form-item label="文本框">
                <el-input />
              </el-form-item>

              <el-form-item label="文本框">
                <el-input type="textarea" rows="4" />
              </el-form-item>

              <el-form-item label="文本框">
                <el-autocomplete
                  :fetch-suggestions="querySearch016bf3f6"
                  @select="handleSelect016bf3f6"
                />
              </el-form-item>

              <el-form-item label="数字文本框">
                <el-input-number :min="1" :max="10" />
              </el-form-item>

              <el-button
                size="medium"
                type="primary"
                :plain="true"
                @click="dialogFormVisible = false"
              >
                取消
              </el-button>

              <el-button size="medium" type="primary" @click="createData">
                确定
              </el-button>
            </el-form>
          </div>
        </div>
      </el-dialog>
    </div>

    <div class="root">
      <el-table :border="true" style="width: 100%" :data="list">
        <el-table-column label="ID">
          <template slot-scope="{ row, column, $index }">
            {{ row.id }}
            <div class="drag-box" />
          </template>
        </el-table-column>

        <el-table-column label="Author">
          <template slot-scope="{ row, column, $index }">
            {{ row.author }}
            <div class="drag-box" />
          </template>
        </el-table-column>

        <el-table-column label="">
          <template slot-scope="{ row, column, $index }">
            <div class="drag-box" />
          </template>
        </el-table-column>

        <el-table-column label="">
          <template slot-scope="{ row, column, $index }">
            <div class="drag-box">
              <el-tag
                size="medium"
                type="success"
                effect="light"
                v-if="row.status === 'published'"
              >
                {{ row.status }}
              </el-tag>

              <el-tag
                size="medium"
                type="warning"
                effect="light"
                v-if="row.status === 'draft'"
              >
                {{ row.status }}
              </el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="{ row, column, $index }">
            <div class="drag-box">
              <el-button size="mini" type="danger" @click="handleDelete">
                删除
              </el-button>

              <el-button size="mini" type="primary" @click="handleUpdate">
                编辑
              </el-button>

              <el-button
                size="mini"
                type="success"
                @click="handleModifyStatus(row, 'published')"
              >
                发布
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="custom-inline">
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </div>

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

    querySearch016bf3f6(queryString, cb) {
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

    handleSelect016bf3f6(item) {
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

    dialogVisibleHandler7d4c1dac() {
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
      selectOptionseb27597d: [
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
<style lang="scss" scoped></style>s