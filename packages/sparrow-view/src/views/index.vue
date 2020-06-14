<template>
  <div class="home">
    <div class="block-list">
      <div class="block-list">
        <box :uuid="'caf50932'" class="block-item">
          <paragraph
            :type="'Container'"
            :emit="'client.component.show'"
            :params="{ uuid: 'caf50932' }"
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
