<template>
  <div class="size-box">
    <div class="size-item">
      <label class="size-label" for="width">
        <span>宽</span>
      </label>
      <div>
        <el-input
          size="mini"
          v-model="input"
          placeholder="请输入内容"
          @input="sizeChange"
        ></el-input>
      </div>
    </div>
    <div class="size-item">
      <label class="size-label" for="width">
        <span>高</span>
      </label>
      <div>
        <el-input
          size="mini"
          v-model="input"
          placeholder="请输入内容"
          @input="sizeChange"
        ></el-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    size: {
      type: Object,
      default() {
        return {
          width: '',
          height: ''
        };
      }
    }
  },
  methods: {
    sizeChange() {
      this.$emit('change', this.size);
    }
  },
}
</script>
<style lang="scss" scoped>
.size-box{
  display: flex;
  flex-direction: row;
  width: 200px;
  .size-item{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
  }
  .size-label{
    width: 20px;
    margin-right: 6px;
    flex-shrink: 0;
  }
}
</style>