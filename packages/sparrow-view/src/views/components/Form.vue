<template>
  <div class="root">
    <el-form label-width="100px">
      <el-form-item label="开关">
        <el-switch placeholder="请输入" v-model="form.delivery" />
      </el-form-item>

      <el-form-item label="日期选择器">
        <el-date-picker v-model="form.date1" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="文本框">
        <el-input placeholder="" v-model="form.name" />
      </el-form-item>

      <el-form-item label="时间选择器">
        <el-date-picker
          v-model="form.date2"
          type="datetime"
          placeholder="选择日期时间"
        >
        </el-date-picker>
      </el-form-item>

      <div style="margin-bottom: 20px;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
          </div>

          <div class="card-content">
            <el-form-item label="文本框">
              <el-input placeholder="" v-model="form.date1" />
            </el-form-item>

            <el-form-item label="文本框">
              <el-input
                placeholder=""
                v-model="form.desc"
                type="textarea"
                rows="4"
              />
            </el-form-item>

            <el-form-item label="文本框">
              <el-autocomplete
                :fetch-suggestions="querySearch15c8402f"
                @select="handleSelect15c8402f"
                placeholder="请输入"
                v-model="form.resource"
              />
            </el-form-item>
          </div>
        </el-card>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  methods: {
    querySearch15c8402f(queryString, cb) {
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

    handleSelect15c8402f(item) {
      console.log(item);
    }
  },

  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
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
