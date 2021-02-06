<template>
  <div>
    <div>
      <div></div>
    </div>
    <div>
      <div>
        <label><span>左</span></label>
        <el-input placeholder="请输入内容"></el-input>
      </div>
      <div>
        <label><span>顶</span></label>
        <el-input placeholder="请输入内容"></el-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      quickList: [
        {
          icon: '',
          value: '',
          label: '左上'
        },
        {
          icon: '',
          value: '',
          label: '上'
        },{
          icon: '',
          value: '',
          label: '右上'
        },
        {
          icon: '',
          value: '',
          label: '左'
        },{
          icon: '',
          value: '',
          label: '中'
        },
        {
          icon: '',
          value: '',
          label: '右'
        },
        {
          icon: '',
          value: '',
          label: '左下'
        },
        {
          icon: '',
          value: '',
          label: '下'
        },
        {
          icon: '',
          value: '',
          label: '右下'
        }
      ]
    }
  }
};
</script>
<style lang="scss" scoped></style>
