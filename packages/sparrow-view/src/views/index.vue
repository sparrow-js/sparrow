<template>
  <div class="home">
    <div class="block-list">
      <div class="block-list">
        <box :uuid="'40d720e8'" class="block-item" :label="''">
          <paragraph
            :type="'Container'"
            :emit="'client.component.show'"
            :params="{ uuid: '40d720e8' }"
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
