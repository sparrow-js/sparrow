<template>
  <div class="home">
    <div class="block-list">
      <box :index="0" :label="'表单'" class="block-item">
        <BaiscFo />
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
import BaiscFo from "./components/BaiscFo";
import generatorMixin from "../mixins/generatorMixin";
export default {
  components: {
    BaiscFo
  },
  mixins: [generatorMixin]
};
</script>
