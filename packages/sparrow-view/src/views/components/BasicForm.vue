<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px">
        <el-form-item label=" ">
          <label-box label="基础文本框" index="0" v-model="id" />
          <el-input v-model="id" index="0" />
        </el-form-item>
      </el-form>
    </box-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 1
    };
  }
};
</script>
