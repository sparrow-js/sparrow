<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px"
        ><component-box :is-active="false" indexcomp="0">
          <el-form-item label=" ">
            <label-box label="文本框" indexcomp="0" v-model="form.name" />
            <el-autocomplete
              v-model="form.name"
              :fetch-suggestions="querySearch524c0e1b"
              placeholder="请输入内容"
              @select="handleSelect524c0e1b"
            />
          </el-form-item> </component-box
        ><component-box :is-active="true" indexcomp="1">
          <el-form-item label=" ">
            <label-box label="文本框" indexcomp="1" v-model="form.id" />
            <el-autocomplete
              v-model="form.id"
              :fetch-suggestions="querySearch4c0e1bc2"
              placeholder="请输入内容"
              @select="handleSelect4c0e1bc2"
            />
          </el-form-item> </component-box
      ></el-form>
    </box-form>
  </div>
</template>

<script>
export default {
  methods: {
    querySearch524c0e1b(queryString, cb) {
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

    handleSelect524c0e1b(item) {
      console.log(item);
    },

    querySearch4c0e1bc2(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      cb(results);
    },

    handleSelect4c0e1bc2(item) {
      console.log(item);
    }
  },

  data() {
    return {
      form: {
        id: 1,
        name: "hello"
      },
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
      state1: ""
    };
  }
};
</script>
