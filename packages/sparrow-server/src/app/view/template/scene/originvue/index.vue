<template>
  <div>
    <el-form label-width="100px" class="demo-ruleForm">
      <el-form-item label="文本框">
        <el-input closable="true" />
      </el-form-item>

      <el-form-item label="文本框">
        <el-input type="textarea" closable="true" rows="4" />
      </el-form-item>

      <el-form-item label="文本框">
        <el-autocomplete
          :fetch-suggestions="querySearch38570f74"
          @select="handleSelect38570f74"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    methods: {
      test () {
        console.log('*test*');
      },
      submitForm () {

      },
      resetForm() {
        
      }
    }
  }
</script>