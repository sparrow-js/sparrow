<template>
  <div class="home">
    <div class="block-list">
      <box :index="0" :label="''" class="block-item">
        <block><TabTable /></block>
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
import TabTable from "./components/TabTable";
import generatorMixin from "../mixins/generatorMixin";
export default {
  components: {
    TabTable
  },
  mixins: [generatorMixin]
};
</script>
