<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px"
        ><component-box indexcomp="0" uuid="35c529e4">
          <el-form-item label=" ">
            <label-box label="文本框" indexcomp="0" uuid="35c529e4" />
            <el-input placeholder="" v-model="form.name" />
          </el-form-item> </component-box
        ><component-box indexcomp="1" uuid="c529e444">
          <el-form-item label=" ">
            <label-box label="数字文本框" indexcomp="1" uuid="c529e444" />
            <el-input-number :min="1" :max="10" />
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
