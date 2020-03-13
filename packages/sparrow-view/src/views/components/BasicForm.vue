<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px"
        ><component-box :is-active="true" indexcomp="0">
          <el-form-item label=" ">
            <label-box label="测试：" indexcomp="0" v-model="name" />
            <el-input v-model="name" />
          </el-form-item> </component-box
        ><component-box :is-active="false" indexcomp="1">
          <el-form-item label=" ">
            <label-box label="名字" indexcomp="1" v-model="id" />
            <el-input v-model="id" />
          </el-form-item> </component-box
        ><component-box :is-active="false" indexcomp="2">
          <el-form-item label=" ">
            <label-box label="基础文本框" indexcomp="2" v-model="name" />
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
      id: 1,
      name: "hello"
    };
  }
};
</script>
