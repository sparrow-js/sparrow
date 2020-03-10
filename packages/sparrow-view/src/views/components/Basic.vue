<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px" :inline="true">
        <el-form-item label=" " prop="name">
          <label-box label="基础文本框" v-model="form.age" index="0" />
          <el-input v-model="form.age" index="0" />
        </el-form-item>

        <el-form-item label=" ">
          <label-box label="活动区域" v-model="form.id" index="1" />
          <el-select placeholder="请选择" v-model="form.id" index="1">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>

        <el-form-item label=" ">
          <label-box label="即时配送" v-model="form.name" index="2" />
          <el-switch v-model="form.name" index="2" />
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
        age: 100,
        name: "hello"
      }
    };
  }
};
</script>
