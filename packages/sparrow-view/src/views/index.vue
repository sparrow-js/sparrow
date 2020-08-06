<template>
  <div class="home drag-box" data-id="04df5c2a">
    <div class="toggle" />

    <box
      data-id="df5c2ae8"
      :uuid="'df5c2ae8'"
      class="block-item"
      :label="'Form'"
    >
      <div class="root">
        <box-form>
          <el-form label-width="100px">
            <div class="drag-box" data-id="df5c2ae8">
              <component-box uuid="e8e3fb19">
                <el-form-item label=" ">
                  <label-box label="文本框" uuid="e8e3fb19" />

                  <el-input placeholder="" />
                </el-form-item>
              </component-box>

              <component-box uuid="e3fb1966">
                <el-form-item label=" ">
                  <label-box label="文本框" uuid="e3fb1966" />

                  <el-input placeholder="" type="textarea" rows="4" />
                </el-form-item>
              </component-box>

              <component-box uuid="fb196602">
                <el-form-item label=" ">
                  <label-box label="文本框" uuid="fb196602" />

                  <el-autocomplete
                    :fetch-suggestions="querySearchfb196602"
                    @select="handleSelectfb196602"
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
    querySearchfb196602(queryString, cb) {
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

    handleSelectfb196602(item) {
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
