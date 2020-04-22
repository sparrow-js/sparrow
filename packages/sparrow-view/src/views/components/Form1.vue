<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px"
        ><component-box :is-active="false" indexcomp="0" uuid="6bc734bb">
          <el-form-item label=" ">
            <label-box label="name:" indexcomp="0" />
            <el-input placeholder="" v-model="form.name" />
          </el-form-item> </component-box
        ><component-box :is-active="false" indexcomp="1" uuid="c734bbbd">
          <el-form-item label=" ">
            <label-box label="特殊资源" indexcomp="1" />
            <el-select placeholder="请选择">
              <el-option
                v-for="item in selectOptions"
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
        name: "",
        age: ""
      },
      selectOptionsc734bbbd: [
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
