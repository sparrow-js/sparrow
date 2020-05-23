<template>
  <div class="logo">
    <div class="logo-box"></div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.logo {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  &-img {
    width: 60px;
  }
  &-box {
    width: 80px;
    height: 80px;
    border-radius: 80px;
    background-color: #f6f6f6;
    overflow: hidden;
  }
}
</style>
