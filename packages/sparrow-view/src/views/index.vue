<template>
  <div class="home">
    <div class="block-list">
      <box :index="0" class="block-item">
        <block><BasicException /></block>
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
import BasicException from "./components/BasicException";
import generatorMixin from "../mixins/generatorMixin";
export default {
  components: {
    BasicException
  },
  mixins: [generatorMixin]
};
</script>
