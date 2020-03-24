<template>
  <div class="home">
    <div class="block-list">
      <box :index="0" class="block-item">
        <BasicForm />
      </box>
    </div>

    <div class="block-list">
      <box :index="1" class="block-item">
        <BasicTable />
      </box>
    </div>

    <div class="block-list">
      <box :index="2" class="block-item">
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="getList"
        />
      </box>
    </div>

    <div class="block-list">
      <box :index="3" class="block-item">
        <paragraph />
      </box>
    </div>
  </div>
</template>

<script>
import BasicTable from "./components/BasicTable";
import BasicForm from "./components/BasicForm";
import generatorMixin from "../mixins/generatorMixin";
export default {
  data() {
    return {
      list: null,
      total: 1,
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
      rules: {},
      downloadLoading: false
    };
  },

  methods: {
    getList() {
      this.listLoading = true; // fetchList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.total = response.data.total
      //   setTimeout(() => {
      //     this.listLoading = false
      //   }, 1.5 * 1000)
      // })
    },

    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    }
  },
  components: {
    BasicForm,
    BasicTable
  },
  mixins: [generatorMixin]
};
</script>
