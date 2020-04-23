<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px"
        ><component-box :is-active="false" indexcomp="0" uuid="67cb7472">
          <el-form-item label=" ">
            <label-box label="特殊资源" indexcomp="0" />
            <el-select placeholder="" v-model="form.name">
              <el-option
                v-for="item in selectOptions67cb7472"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item> </component-box
      ></el-form>
    </box-form>
  </div>
</template>

<script>
export default {
  methods: {},

  data() {
    return {
      form: {
        name: ""
      },
      selectOptions67cb7472: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        }
      ]
    };
  }
};
</script>
