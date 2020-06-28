<template>
  <div class="home">
    <div class="block-list">
      <div class="block-list test">
        <box :uuid="'c3338f20'" class="block-item" :label="''">
          <paragraph
            :type="'Container'"
            :emit="'client.component.show'"
            :params="{ uuid: 'c3338f20' }"
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
