<template>
  <div class="home">
    <div class="block-list">
      <box :index="0" class="block-item">
        <block><BasicTable1 /></block>
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
import BasicTable1 from "./components/BasicTable1";
import generatorMixin from "../mixins/generatorMixin";
export default {
  components: {
    BasicTable1
  },
  mixins: [generatorMixin]
};
</script>
