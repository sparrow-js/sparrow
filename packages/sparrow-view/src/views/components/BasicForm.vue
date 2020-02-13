<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px">
        <el-form-item label="基础文本框" prop="name" v-model="form.id">
          <el-input v-model="form.id" />
        </el-form-item>

        <el-form-item label="基础文本框" prop="name" v-model="form.name">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-form>
    </box-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        id: 1,
        name: "hello"
      }
    };
  }
};
</script>
