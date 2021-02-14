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
        {{ item.icon }}
      </span>
    </el-tooltip>
  </div>
</template>
<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
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
      this.$emit('change', value);
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
    flex: 1;
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
    color: #fff;
  }
  .selected:hover{
    background-color: #409EFF;
  }
}
</style>