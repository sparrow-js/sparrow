<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px"
        ><component-box :is-active="true" indexcomp="0">
          <el-form-item label=" ">
            <label-box label="测试:" indexcomp="0" v-model="form.name" />
            <el-input v-model="form.name" />
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
