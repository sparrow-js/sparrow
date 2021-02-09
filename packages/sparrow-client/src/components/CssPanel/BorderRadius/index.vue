<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-input-number
          class="input-number-width100 mb10"
          controls-position="right"
          size="mini"
        ></el-input-number>
      </el-col>
      <el-col :span="12">
        <el-input-number
          class="input-number-width100 mb10"
          controls-position="right"
          size="mini"
        ></el-input-number>
      </el-col>
      <el-col :span="12">
        <el-input-number
          class="input-number-width100"
          controls-position="right"
          size="mini"
        ></el-input-number>
      </el-col>
      <el-col :span="12">
        <el-input-number
          class="input-number-width100"
          controls-position="right"
          size="mini"
        ></el-input-number>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.input-number-width100{
  width: 100px;
}
.mb10{
  margin-bottom: 10px;
}
</style>