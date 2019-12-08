<template>
  <div>
    <block>
      <layout :col="3" :row='2'></layout>
    </block>
    <block>
      <paragraph></paragraph>
    </block>
  </div>
</template>
<script>
import Block from './Block';
import Layout from './box/Layout.vue';
import Paragraph from './Paragraph';
export default {
  components: {
    Block,
    Layout,
    Paragraph
  }
}
</script>
<style lang="scss" scoped>

</style>