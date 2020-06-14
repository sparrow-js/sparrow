<template>
  <div class="home">
    <div class="block-list">
      <div class="block-list">
        <box :uuid="'c7a833ec'" class="block-item">
          <paragraph
            :type="'Container'"
            :emit="'client.component.show'"
            :params="{ uuid: 'c7a833ec' }"
          />
        </box>
      </div>
    </div>
  </div>
</template>

<script>
import generatorMixin from "../mixins/generatorMixin";
export default {
  mixins: [generatorMixin]
};
</script>
