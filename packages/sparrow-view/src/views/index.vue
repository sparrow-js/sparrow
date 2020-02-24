<template>
  <div class="home">
    <div class="block-list">
      <box :index="0" class="block-item">
        <block><BasicTable2 /></block>
      </box>
    </div>

    <div class="block-list">
      <box :index="1" class="block-item">
        <paragraph />
      </box>
    </div>
  </div>
</template>

<script>
import BasicTable2 from "./components/BasicTable2";
import generatorMixin from "../mixins/generatorMixin";
export default {
  components: {
    BasicTable2
  },
  mixins: [generatorMixin]
};
</script>
