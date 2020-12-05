export default {
  code: `
<template>
  <div></div>
</template>
<script>
  export default {
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>  
  `
}