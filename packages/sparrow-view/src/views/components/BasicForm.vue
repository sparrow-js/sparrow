<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px"
        ><component-box :is-active="false" indexcomp="0">
          <el-form-item label=" ">
            <label-box label="文本框" indexcomp="0" v-model="form.name" />
            <el-input v-model="form.name" />
          </el-form-item> </component-box
        ><component-box :is-active="false" indexcomp="1">
          <el-form-item label=" ">
            <label-box label="文本框" indexcomp="1" v-model="form.age" />
            <el-input v-model="form.age" />
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
