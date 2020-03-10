<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px">
        <el-form-item label=" " prop="name">
          <label-box label="基础文本框" v-model="form.name" index="0" />
          <el-input v-model="form.name" index="0" />
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
        id: 2,
        age: "3",
        name: 10
      }
    };
  }
};
</script>
