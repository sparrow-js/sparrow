<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          <el-input v-if="scope.row.editable" placeholder="请输入内容"></el-input>
          <template v-else> {{ scope.row.title }}</template>
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>

       <el-table-column label="操作" width="110" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.editable">
            <span v-if="scope.row.isNew">
               <a @click="saveRow(scope.row)">添加</a>
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                  @onConfirm="remove(scope.row.id)"
                >
                <el-button slot="reference">删除</el-button>
              </el-popconfirm>
            </span>
            <span v-else>
              <a @click="saveRow(scope.row)">保存</a>
              <a @click="cancel(scope.row.id)">取消</a>
            </span>
          </span>
          <span v-else>
            <a @click="toggle(scope.row.id)">编辑</a>
            <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="remove(scope.row.id)"
              >
              <el-button slot="reference">删除</el-button>
            </el-popconfirm>
          </span>
      
        </template>
      </el-table-column>
    </el-table>
    <el-button style="width: 100%;margin-top: 10px;" icon="el-icon-plus" @click="newMember">新增</el-button>

  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      tableItem: {
        id: '7100001',
        title: 'Mfvdrwgkif gucdmqbl',
        status: 'published',
        author: 'name',
        display_time: '2014-07-21 12:14:40',
        pageviews: 4440,
      },
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items.map(item => {item.editable = false; return item;})
        this.listLoading = false
      });
    },
  }
}
</script>
