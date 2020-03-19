<template>
  <div class="home">
    <div class="block-list">
      <box :index="0" class="block-item">
        <block><SelectTable /></block>
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
import SelectTable from "./components/SelectTable";
import generatorMixin from "../mixins/generatorMixin";
export default {
  components: {
    SelectTable
  },
  mixins: [generatorMixin]
};
</script>
