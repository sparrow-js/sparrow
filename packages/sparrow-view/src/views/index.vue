<template>
  <div class="home">
    <div class="block-list">
      <box :index="0" class="block-item">
        <block><BasicTable /></block>
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
import BasicTable from "./components/BasicTable";
import generatorMixin from "../mixins/generatorMixin";
export default {
  components: {
    BasicTable
  },
  mixins: [generatorMixin]
};
</script>
