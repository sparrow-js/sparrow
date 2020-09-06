<template>
  <div>
    <sticky :z-index="10" class-name="sub-navbar">
      <el-button style="margin-left: 10px;" type="success">
        publish
      </el-button>
    </sticky>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky'

export default {
  name: 'StickyDemo',
  components: { Sticky },
}
</script>

<style scoped></style>
