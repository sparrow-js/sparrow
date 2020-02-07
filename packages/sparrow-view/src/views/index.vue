<template>
  <div class="home">
    <div class="block-list">
      <box :index="0" class="block-item">
        <block><BasicTable7 /></block>
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
import BasicTable7 from "./components/BasicTable7";
import generatorMixin from "../mixins/generatorMixin";
export default {
  components: {
    BasicTable7
  },
  mixins: [generatorMixin]
};
</script>
