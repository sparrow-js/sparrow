<template>
  <div class="home">
    <div class="block-list">
      <box :uuid="'46e03f24'" class="block-item" :label="''">
        <paragraph
          :type="'Container'"
          :emit="'client.component.show'"
          :params="{ uuid: '46e03f24' }"
        />
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
