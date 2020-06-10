<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px"
        ><component-box indexcomp="0" uuid="58107ec6">
          <el-form-item label=" ">
            <label-box label="文本框" indexcomp="0" uuid="58107ec6" />
            <el-input placeholder="" v-model="form.name" />
          </el-form-item> </component-box
        ><component-box indexcomp="1" uuid="107ec675">
          <el-form-item label=" ">
            <label-box label="数字文本框" indexcomp="1" uuid="107ec675" />
            <el-input-number
              placeholder=""
              v-model="form.age"
              :min="1"
              :max="10"
            />
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
        age: 1
      }
    };
  }
};
</script>
