<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px"
        ><component-box :is-active="false" indexcomp="0" uuid="1713973b">
          <el-form-item label=" ">
            <label-box label="多选框" indexcomp="0" />
            <el-checkbox-group v-model="form.like">
              <el-checkbox
                v-for="item in checkboxOptions1713973b"
                :key="item.value"
                :label="item.label"
              />
            </el-checkbox-group>
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
        like: []
      },
      checkboxOptions1713973b: [
        {
          value: "复选框1",
          label: "复选框1"
        },
        {
          value: "复选框2",
          label: "复选框2"
        },
        {
          value: "复选框3",
          label: "复选框3"
        },
        {
          value: "复选框13",
          label: "复选框13"
        }
      ]
    };
  }
};
</script>
