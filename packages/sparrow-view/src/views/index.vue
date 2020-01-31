<template>
  <div class="home">
    <div class="block-list">
      <box :index="0" class="block-item">
        <block><DataDisplay /></block>
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
import DataDisplay from "./components/DataDisplay";
import generatorMixin from "../mixins/generatorMixin";
export default {
  components: {
    DataDisplay
  },
  mixins: [generatorMixin]
};
</script>
