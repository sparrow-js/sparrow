<template>
  <div class="home drag-box" data-id="f0e13095">
    <box
      data-id="e1309550"
      :uuid="'e1309550'"
      class="block-item"
      :label="'Form'"
    >
      <div class="root">
        <box-form>
          <el-form label-width="100px">
            <div class="drag-box" data-id="e1309550">
              <component-box uuid="30955076">
                <el-form-item label=" ">
                  <label-box label="文本框" uuid="30955076" />

                  <el-input placeholder="" />
                </el-form-item>
              </component-box>

              <component-box uuid="955076ff">
                <el-form-item label=" ">
                  <label-box label="文本框" uuid="955076ff" />

                  <el-input placeholder="" type="textarea" rows="4" />
                </el-form-item>
              </component-box>

              <component-box uuid="5076ffec">
                <el-form-item label=" ">
                  <label-box label="文本框" uuid="5076ffec" />

                  <el-autocomplete
                    :fetch-suggestions="querySearch5076ffec"
                    @select="handleSelect5076ffec"
                    placeholder=""
                  />
                </el-form-item>
              </component-box>
            </div>
          </el-form>
        </box-form>
      </div>
    </box>
  </div>
</template>

<script>
export default {
  methods: {
    querySearch5076ffec(queryString, cb) {
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

    handleSelect5076ffec(item) {
      console.log(item);
    }
  },

  data() {
    return {
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
