<template>
  <div class="home">
    <ul class="block-list">
      <li class="block-item">
        <block>
          <paragraph></paragraph>
        </block>
      </li>
      <li class="block-item">
        <block>
          <layout :col="3" :row="2"></layout>
        </block>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import Block from "@/components/Block";
import Paragraph from '@/components/Paragraph';
import Layout from '@/components/Layout'
export default {
  name: "home",
  components: {
    Block,
    Paragraph,
    Layout
  }
};
</script>
<style lang="scss" scoped>
.block-list{
  list-style: none;
  .block-item{
    margin-bottom: 12px;
  }
}
</style>
