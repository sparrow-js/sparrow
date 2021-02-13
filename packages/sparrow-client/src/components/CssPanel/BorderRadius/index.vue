<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-input-number
          class="input-number-width100 mb10"
          controls-position="right"
          size="mini"
          v-model="rect.borderTopLeftRadius"
        ></el-input-number>
      </el-col>
      <el-col :span="12">
        <el-input-number
          class="input-number-width100 mb10"
          controls-position="right"
          size="mini"
          v-model="rect.borderTopRightRadius"
        ></el-input-number>
      </el-col>
      <el-col :span="12">
        <el-input-number
          class="input-number-width100"
          controls-position="right"
          size="mini"
          v-model="rect.borderBottomLeftRadius"
        ></el-input-number>
      </el-col>
      <el-col :span="12">
        <el-input-number
          class="input-number-width100"
          controls-position="right"
          size="mini"
          v-model="rect.borderBottomRightRadius"
        ></el-input-number>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    rect: {
      type: Object,
      default () {
        return {
          borderTopLeftRadius: '',
          borderTopRightRadius: '',
          borderBottomLeftRadius: '',
          borderBottomRightRadius: '',
        };
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.input-number-width100{
  width: 100px;
}
.mb10{
  margin-bottom: 10px;
}
</style>