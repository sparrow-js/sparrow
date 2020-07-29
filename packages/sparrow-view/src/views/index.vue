<template>
  <div class="home drag-box" data-id="8698e0b5">
    <div style="margin-bottom: 20px;">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>基础</span>
        </div>

        <div class="card-content">
          <div>
            <div class="box">
              <div>
                <div class="box">
                  <div class="root">
                    <el-form label-width="100px">
                      <div class="drag-box" data-id="7f82bd4a">
                        <el-form-item label="数字文本框">
                          <el-input-number :min="1" :max="10" />
                        </el-form-item>

                        <el-form-item label="文本框">
                          <el-input placeholder="" type="textarea" rows="4" />
                        </el-form-item>

                        <el-form-item label="文本框">
                          <el-autocomplete
                            :fetch-suggestions="querySearch4ae495d3"
                            @select="handleSelect4ae495d3"
                            placeholder="请输入"
                          />
                        </el-form-item>
                      </div>
                    </el-form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <div>
      <div class="box" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    querySearch4ae495d3(queryString, cb) {
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

    handleSelect4ae495d3(item) {
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
