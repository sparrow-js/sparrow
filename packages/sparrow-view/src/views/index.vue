<template>
  <div class="home">
    <div class="block-list">
      <box :uuid="'f22c2a13'" class="block-item" :label="''">
        <paragraph
          :type="'Container'"
          :emit="'client.component.show'"
          :params="{ uuid: 'f22c2a13' }"
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
