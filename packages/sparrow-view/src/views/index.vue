<template>
  <div class="home">
    <div class="block-list">
      <box :index="0" class="block-item">
        <paragraph />
      </box>
    </div>
  </div>
</template>

<script>
import generatorMixin from "../mixins/generatorMixin";
export default {
  mixins: [generatorMixin]
};
</script>
