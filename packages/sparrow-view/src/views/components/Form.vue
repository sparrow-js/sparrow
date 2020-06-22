<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px"
        ><component-box indexcomp="0" uuid="35547a57">
          <el-form-item label=" ">
            <label-box label="文本框" indexcomp="0" uuid="35547a57" />
            <el-input placeholder="" v-model="form.name" />
          </el-form-item> </component-box
        ><component-box indexcomp="1" uuid="547a578c">
          <el-form-item label=" ">
            <label-box label="文本框" uuid="547a578c" indexcomp="1" />
            <el-autocomplete
              :fetch-suggestions="querySearch547a578c"
              @select="handleSelect547a578c"
              placeholder="请输请输"
              v-model="form.region"
            />
          </el-form-item> </component-box
        ><component-box indexcomp="2" uuid="7a578ce9">
          <el-form-item label=" ">
            <label-box label="单选框" indexcomp="2" uuid="7a578ce9" />
            <el-radio-group v-model="form.date1">
              <el-radio
                v-for="item in radionboxOptions7a578ce9"
                :key="item.value"
                :label="item.label"
              />
            </el-radio-group>
          </el-form-item> </component-box
        ><component-box indexcomp="3" uuid="578ce93c">
          <el-form-item label=" ">
            <label-box label="特殊资源" indexcomp="3" uuid="578ce93c" />
            <el-select placeholder="请输入" v-model="form.date2">
              <el-option
                v-for="item in selectOptions578ce93c"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item> </component-box
        ><component-box indexcomp="4" uuid="8ce93ccb">
          <el-form-item label=" ">
            <label-box label="开关" indexcomp="4" uuid="8ce93ccb" />
            <el-switch placeholder="请输入" v-model="form.delivery" />
          </el-form-item> </component-box
      ></el-form>
    </box-form>
  </div>
</template>

<script>
export default {
  methods: {
    querySearch547a578c(queryString, cb) {
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

    handleSelect547a578c(item) {
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
      state1: "",
      radionboxOptions7a578ce9: [
        {
          value: "单选框1",
          label: "单选框1"
        },
        {
          value: "单选框2",
          label: "单选框2"
        },
        {
          value: "单选框3",
          label: "单选框3"
        }
      ],
      selectOptions578ce93c: [
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
      ]
    };
  }
};
</script>
