<template>
  <div class="radio-group">
    <el-tooltip
      v-for="item in list"
      :key="item.value"
      class="item"
      effect="dark"
      :content="item.label"
      placement="top"
    >
      <span
        class="radio-item"
        :class="{ selected: item.value === value }"
        @click="radioChange(item)"
      >
      </span>
    </el-tooltip>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default () {
        return [];
      }
    },
    value: String
  },
  methods: {
    radioChange({ value }) {
      if (this.value === value) {
        value = '';
      }
      this.$emit('change', {
        value,
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.radio-group{
  display: flex;
  flex-direction: row;
  .radio-item{
    border: 1px solid #dcdfe6;
    min-width: 36px;
    height: 28px;
    margin: 0 0 0 -1px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .radio-item:hover{
    background-color: #e9e9eb;
  }
  .selected{
    background-color: #409EFF;
  }
  .selected:hover{
    background-color: #409EFF;
  }
}
</style>