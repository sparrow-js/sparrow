<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px" :inline="true"
        ><component-box :is-active="false" indexcomp="0">
          <el-form-item label=" ">
            <label-box label="ID:" indexcomp="0" v-model="form" />
            <el-input v-model="form" />
          </el-form-item> </component-box
        ><component-box :is-active="false" indexcomp="1">
          <el-form-item label=" ">
            <label-box label="名称：" indexcomp="1" v-model="name" />
            <el-input v-model="name" />
          </el-form-item> </component-box
      ></el-form>
    </box-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: "",
      name: "",
      age: ""
    };
  }
};
</script>
