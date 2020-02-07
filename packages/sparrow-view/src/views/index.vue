<template>
  <div class="home">
    <div class="block-list">
      <box :index="0" class="block-item">
        <block><BasicTable4 /></block>
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
import BasicTable4 from "./components/BasicTable4";
import generatorMixin from "../mixins/generatorMixin";
export default {
  components: {
    BasicTable4
  },
  mixins: [generatorMixin]
};
</script>
