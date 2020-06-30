<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px"
        ><component-box indexcomp="0" uuid="c4eb782f">
          <el-form-item label=" ">
            <label-box label="文本框" uuid="c4eb782f" />
            <el-input placeholder="" v-model="form.name" />
          </el-form-item> </component-box
      ></el-form>
    </box-form>
  </div>
</template>

<script>
export default {
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
      }
    };
  }
};
</script>
