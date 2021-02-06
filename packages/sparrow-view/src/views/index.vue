<template>
  <div class="home drag-box" data-id="ebd8a088" style="">
    <div
      class="drag-box clearfix"
      data-design-mode="design-border-box"
      data-instance-name="Container"
      data-id="88a277c7"
      style="display: block;flex-direction: column;"
      data-empty="true"
    />

    <div
      class="root"
      data-design-mode="design-border-box"
      data-instance-name="Form"
      data-id="5e6adecf"
      data-type="box"
    >
      <box-form>
        <el-form label-width="100px">
          <div class="drag-box" data-id="5e6adecf">
            <el-form-item
              label=" "
              data-design-mode="design-border-component"
              data-instance-name="Input"
              data-id="5ae61517"
              data-type="component"
            >
              <edit-text-box slot="label" :clearClass="true" uuid="5ae61517">
                文本框
              </edit-text-box>

              <el-input closable="true" />
            </el-form-item>

            <el-form-item
              label=" "
              data-design-mode="design-border-component"
              data-instance-name="Input"
              data-id="decf1590"
              data-type="component"
            >
              <edit-text-box slot="label" :clearClass="true" uuid="decf1590">
                文本框
              </edit-text-box>

              <el-input type="textarea" closable="true" rows="4" />
            </el-form-item>

            <el-form-item
              label=" "
              data-design-mode="design-border-component"
              data-instance-name="InputNumber"
              data-id="e61517bd"
              data-type="component"
            >
              <edit-text-box slot="label" :clearClass="true" uuid="e61517bd">
                数字文本框
              </edit-text-box>

              <el-input-number :min="1" :max="10" />
            </el-form-item>

            <el-form-item
              label=" "
              data-design-mode="design-border-component"
              data-instance-name="Autocomplete"
              data-id="44695ae6"
              data-type="component"
            >
              <edit-text-box slot="label" :clearClass="true" uuid="44695ae6">
                文本框
              </edit-text-box>

              <el-autocomplete
                :fetch-suggestions="querySearch44695ae6"
                @select="handleSelect44695ae6"
              />
            </el-form-item>
          </div>
        </el-form>
      </box-form>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {
    querySearch44695ae6(queryString, cb) {
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

    handleSelect44695ae6(item) {
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
<style lang="scss" scoped></style>
