<template>
  <div class="home">
    <div class="block-list">
      <box :uuid="'bc5fb176'" class="block-item" :label="''">
        <paragraph
          :type="'Container'"
          :emit="'client.component.show'"
          :params="{ uuid: 'bc5fb176' }"
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
