<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px"
        ><component-box indexcomp="0" uuid="834863c8">
          <el-form-item label=" ">
            <label-box label="文本框" indexcomp="0" uuid="834863c8" />
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
        name: ""
      }
    };
  }
};
</script>
