<template>
  <div class="css-item">
    <div class="css-item__header" :style="{width: width}">
      {{ label }}
    </div>
    <div class="css-item__body">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '80px'
    }
  }
};
</script>
<style lang="scss" scoped>
.css-item {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  &__header {
    width: 80px;
    flex-shrink: 0;
    padding-top: 4px;
    color: #333;
  }
  &__body {
    flex: 1;
  }
}
</style>
