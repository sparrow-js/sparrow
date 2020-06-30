<template>
  <div class="home">
    <div class="block-list">
      <div class="block-list test">
        <box :uuid="'47d04287'" class="block-item" :label="'Form'">
          <div class="box">
            <Form5 />
          </div>
        </box>
      </div>
    </div>

    <div class="block-list">
      <div class="block-list test">
        <box :uuid="'4287abc9'" class="block-item" :label="''">
          <paragraph
            :type="'Container'"
            :emit="'client.component.show'"
            :params="{ uuid: '4287abc9' }"
          />
        </box>
      </div>
    </div>
  </div>
</template>

<script>
import Form5 from "./components/Form5";
import generatorMixin from "../mixins/generatorMixin";
export default {
  components: {
    Form5
  },
  mixins: [generatorMixin]
};
</script>
