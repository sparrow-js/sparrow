<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px"
        ><component-box indexcomp="0" uuid="887340ea">
          <el-form-item label=" ">
            <label-box label="文本框" indexcomp="0" uuid="887340ea" />
            <el-input placeholder="" v-model="form.name" />
          </el-form-item> </component-box
        ><component-box indexcomp="1" uuid="7340eae5">
          <el-form-item label=" ">
            <label-box label="文本框" uuid="7340eae5" indexcomp="1" />
            <el-autocomplete
              :fetch-suggestions="querySearch7340eae5"
              @select="handleSelect7340eae5"
              placeholder="请输入"
              v-model="form.id"
            />
          </el-form-item> </component-box
      ></el-form>
    </box-form>
  </div>
</template>

<script>
export default {
  methods: {
    querySearch7340eae5(queryString, cb) {
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

    handleSelect7340eae5(item) {
      console.log(item);
    }
  },

  data() {
    return {
      form: {
        name: "",
        id: 1
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
