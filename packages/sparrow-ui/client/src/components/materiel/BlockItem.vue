<template>
  <div class="block">
    <div class="block-preview">
      <div class="block-preview__img"></div>
    </div>
    <div class="block-content">
      <h2 class="block-title">form-基础表单</h2>
      <p class="block-des">用户填写必须的信息以注册新用户。</p>
      <div class="block-label__box">
        <span class="block-label__item">标签1</span>
        <span class="block-label__item">标签2</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
.block{
  &-preview{
    background-color: #30303d;
    height: 150px;
  }
  &-content{
    background-color: #30303d;
    padding: 10px;
    margin-top: 1px;
    text-align: left;
  }
  &-title{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    line-height: 22px;
    color: rgba(255, 255, 255, 0.85);
    font-weight: 500;
  }
  &-des{
    margin-top: 4px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.45);
    letter-spacing: 0;
    line-height: 20px;
    height: 40px;
    margin-bottom: 0;
  }
  &-label__box{
    margin-top: 5px;
  }
  &-label__item{
    margin-right: 4px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.45);
  }
}
</style>