<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px">
        <el-form-item label="基础文本框" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item label="活动区域">
          <el-select placeholder="请选择" v-model="form.age">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
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
        age: 2,
        name: "hello"
      }
    };
  }
};
</script>
