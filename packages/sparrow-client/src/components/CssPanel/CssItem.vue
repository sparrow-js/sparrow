<template>
  <div class="css-item">
    <div class="css-item__header">
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
  }
  &__body {
    flex: 1;
  }
}
</style>
