<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px"
        ><component-box indexcomp="0" uuid="d4029907">
          <el-form-item label=" ">
            <label-box label="文本框" indexcomp="0" uuid="d4029907" />
            <el-input placeholder="" v-model="form.name" />
          </el-form-item> </component-box
        ><component-box indexcomp="1" uuid="0299076f">
          <el-form-item label=" ">
            <label-box label="文本框" indexcomp="1" uuid="0299076f" />
            <el-input placeholder="" v-model="form.name" />
          </el-form-item> </component-box
        ><component-box indexcomp="2" uuid="99076f89">
          <el-form-item label=" ">
            <label-box label="文本框" uuid="99076f89" indexcomp="2" />
            <el-autocomplete
              :fetch-suggestions="querySearch99076f89"
              @select="handleSelect99076f89"
              placeholder="请输入"
              v-model="form.name"
            />
          </el-form-item> </component-box
        ><component-box indexcomp="3" uuid="076f8935">
          <el-form-item label=" ">
            <label-box label="文本框" indexcomp="3" uuid="076f8935" />
            <el-input
              placeholder=""
              v-model="form.id"
              type="textarea"
              rows="4"
            />
          </el-form-item> </component-box
      ></el-form>
    </box-form>
  </div>
</template>

<script>
export default {
  methods: {
    querySearch99076f89(queryString, cb) {
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

    handleSelect99076f89(item) {
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
