export default {
  code: `
<template>
  <div class="app-container">
    <el-button type="primary" icon="el-icon-document" @click="handleCopy('clipboard',$event)">
      copy
    </el-button>
  </div>
</template>

<script>
import clip from '@/utils/clipboard' // use clipboard directly

export default {
  name: 'ClipboardDemo',
  methods: {
    handleCopy(text, event) {
      clip(text, event);
      this.$message({
        message: 'Copy successfully',
        type: 'success',
        duration: 1500
      })
    }
  }
}
</script> 
  `
}