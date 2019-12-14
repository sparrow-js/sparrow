<template>
  <div class="home">
    <ul class="block-list">
      <li class="block-item">
        <block :index="0">
          <paragraph></paragraph>
        </block>
      </li>
      <li class="block-item">
        <block :index="1">
          <layout :col="3" :row="2"></layout>
        </block>
      </li>
      <li>
        <div>
          <toolbar />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import Block from "@/components/Block";
import Paragraph from '@/components/Paragraph';
import Layout from '@/components/Layout';
import Event from '../utils/Event';
import Toolbar from '@/components/Toolbar';

export default {
  name: "home",
  components: {
    Block,
    Paragraph,
    Layout,
    Toolbar
  },
  created () {
    Event.on('test', () => {
      console.log('**********10******');
    })
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
