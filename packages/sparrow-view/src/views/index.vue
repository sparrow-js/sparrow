<template>
  <div class="home">
    <div class="block-list">
      <box :index="0" class="block-item">
        <block><BasicException /></block>
      </box>
    </div>

    <div class="block-list">
      <box :index="2" class="block-item">
        <BasicForm />
      </box>
    </div>

    <div class="block-list">
      <box :index="3" class="block-item">
        <paragraph />
      </box>
    </div>
  </div>
</template>

<script>
import BasicForm from "./components/BasicForm";
import BasicException from "./components/BasicException";
import generatorMixin from "../mixins/generatorMixin";
export default {
  components: {
    BasicException,
    BasicForm
  },
  mixins: [generatorMixin]
};
</script>
