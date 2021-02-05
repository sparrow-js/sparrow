<template>
  <div class="array-container">
    <div class="header">
      <a @click="$emit('removeItem')">
        <i class="el-icon-close header__icon" />
      </a>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['model'],
  data() {
    return {
      contentVisible: false
    };
  }
};
</script>
<style lang="scss" scoped>
.header {
  background: #f5f7fa;
  border: 1px solid #d7dae2;
  padding: 5px 10px;
  font-size: 16px;
  display: flex;
  justify-content: flex-end;
  &__icon {
    color: red;
    font-weight: bold;
  }
}

.content {
  border: 2px solid whitesmoke;
  padding: 10px;
}

a {
  text-decoration: underline;
}
</style>
