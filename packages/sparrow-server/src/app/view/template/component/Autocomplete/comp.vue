<template>
  <el-form ref="form" :model="form" label-width="80px" class="root">
    <el-form-item label=" ">
      <el-autocomplete
        v-model="state1"
        :fetch-suggestions="querySearch_unique"
        placeholder="请输入内容"
        @select="handleSelect_unique"
      ></el-autocomplete>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    data() {
      return {
        restaurants: [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
        ],
        state1: '',
      };
    },
    methods: {
      querySearch_unique(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect_unique(item) {
        console.log(item);
      }
    }
  }
</script>