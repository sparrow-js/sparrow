<template>
  <div class="block">
    <div class="block__toolbar">
      <div 
        class="block__preview" 
        style="background-image: url(https://gitee.com/ant-design/ant-design-blocks/raw/master/select-basic/snapshot.png);"
      ></div>
      <div class="block__operate">
        <div style="margin-bottom: 4px;">
          <el-button type="primary" size="small">添加组件</el-button>
        </div>
        <div>
          <el-button size="small">预览图片</el-button>
        </div>
      </div>
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
  &__toolbar{
    background-color: #30303d;
    height: 150px;
    position: relative;
  }
  &__preview{
    width: 100%;
    height: 100%;
    background-position: top center;
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-color: #fff;
  }
  &__operate{
    opacity: 0;
    background: rgba(0, 0, 0, 0.65);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  &__operate:hover{
    opacity: 1;
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