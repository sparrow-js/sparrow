<template>
  <div class="slot">
    <el-form-item label="基本文本框" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        name: ''
      }
    }
  }
}
</script>