<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px" :inline="false">
        <el-form-item label="基础文本框" prop="name">
          <el-input v-model="id" />
        </el-form-item>

        <el-form-item label="基础文本框" prop="name">
          <el-input v-model="age" />
        </el-form-item>
      </el-form>
    </box-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "name",
      age: "hello world"
    };
  }
};
</script>
