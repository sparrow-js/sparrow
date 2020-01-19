<template>
  <div class="home">
    <div class="block-list">
      <box :index="0" class="block-item">
        <block><BasicTable10 /></block>
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
import BasicTable10 from "./components/BasicTable10";
import generatorMixin from "../mixins/generatorMixin";
export default {
  components: {
    BasicTable10
  },
  mixins: [generatorMixin]
};
</script>
