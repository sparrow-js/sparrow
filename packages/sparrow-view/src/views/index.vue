<template>
  <div class="home drag-box" data-id="e05b2e81">
    <box
      data-id="5b2e8103"
      :uuid="'5b2e8103'"
      class="block-item"
      :label="'Steps'"
    >
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1">
          <box
            data-id="2e8103b8"
            :uuid="'2e8103b8'"
            class="block-item"
            label="TabPane"
          >
            <div class="column drag-box" data-id="2e8103b8">
              <div class="empty-container">empty</div>
            </div>
          </box>
        </el-step>

        <el-step title="步骤 1">
          <box
            data-id="8103b826"
            :uuid="'8103b826'"
            class="block-item"
            label="TabPane"
          >
            <div class="column drag-box" data-id="8103b826">
              <div class="empty-container">empty</div>
            </div>
          </box>
        </el-step>

        <el-step title="步骤 1">
          <box
            data-id="03b82673"
            :uuid="'03b82673'"
            class="block-item"
            label="TabPane"
          >
            <div class="column drag-box" data-id="03b82673">
              <div class="empty-container">empty</div>
            </div>
          </box>
        </el-step>
      </el-steps>
    </box>

    <box
      data-id="394d021c"
      :uuid="'394d021c'"
      class="block-item"
      :label="'Container'"
    >
      <div v-if="active === 0">
        <div class="drag-box" data-id="394d021c">
          <box
            data-id="4d021ca6"
            :uuid="'4d021ca6'"
            class="block-item"
            :label="'Form'"
          >
            <div class="root">
              <box-form>
                <el-form label-width="100px">
                  <div class="drag-box" data-id="4d021ca6">
                    <component-box uuid="021ca6a0">
                      <el-form-item label=" ">
                        <label-box
                          slot="label"
                          label="文本框"
                          uuid="021ca6a0"
                        />

                        <el-input />
                      </el-form-item>
                    </component-box>

                    <component-box uuid="1ca6a0c0">
                      <el-form-item label=" ">
                        <label-box
                          slot="label"
                          label="文本框"
                          uuid="1ca6a0c0"
                        />

                        <el-autocomplete
                          :fetch-suggestions="querySearch1ca6a0c0"
                          @select="handleSelect1ca6a0c0"
                        />
                      </el-form-item>
                    </component-box>

                    <component-box uuid="a6a0c01e">
                      <el-form-item label=" ">
                        <label-box
                          slot="label"
                          label="数字文本框"
                          uuid="a6a0c01e"
                        />

                        <el-input-number :min="1" :max="10" />
                      </el-form-item>
                    </component-box>
                  </div>
                </el-form>
              </box-form>
            </div>
          </box>
        </div>
      </div>
    </box>

    <box
      data-id="2673394d"
      :uuid="'2673394d'"
      class="block-item"
      :label="'Container'"
    >
      <div>
        <div class="drag-box" data-id="2673394d">
          <div class="empty-container">empty</div>
        </div>
      </div>
    </box>

    <component-box uuid="b8267339" :isInline="true">
      <el-button type="primary" size="medium" :plain="true" @click="next">
        <edit-text-box :clearClass="true" uuid="b8267339">下一步</edit-text-box>
      </el-button>
    </component-box>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    },

    querySearch1ca6a0c0(queryString, cb) {
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

    handleSelect1ca6a0c0(item) {
      console.log(item);
    }
  },

  data() {
    return {
      active: 0,
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
