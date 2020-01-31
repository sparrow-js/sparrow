<template>
  <div class="home">
    <div class="block-list">
      <box :index="0" class="block-item">
        <block><BasicForm3 /></block>
      </box>
    </div>

    <div class="block-list">
      <box :index="1" class="block-item">
        <block />
      </box>
    </div>

    <div class="block-list">
      <box :index="2" class="block-item">
        <paragraph />
      </box>
    </div>
  </div>
</template>

<script>
import BasicForm3 from "./components/BasicForm3";
import generatorMixin from "../mixins/generatorMixin";
export default {
  components: {
    BasicForm3
  },
  mixins: [generatorMixin]
};
</script>
