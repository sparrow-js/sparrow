
<template>
  <div class="home">
    <el-form label-width="100px" class="demo-ruleForm">
      <BasicInput />
    </el-form>
  </div>
</template>

<script>
import BasicInput from '../../BasicInput/src';

export default {
  name: "home",
  components: {
    BasicInput
  }
};
</script>
  