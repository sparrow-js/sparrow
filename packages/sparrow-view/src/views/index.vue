<template>
  <div class="home">
    <div class="block-list">
      <box :index="0" :label="'表单'" class="block-item">
        <BasicForm />
      </box>
    </div>

    <div class="block-list">
      <box :index="1" class="block-item">
        <paragraph />
      </box>
    </div>
  </div>
</template>

<script>
import BasicForm from "./components/BasicForm";
import generatorMixin from "../mixins/generatorMixin";
export default {
  components: {
    BasicForm
  },
  mixins: [generatorMixin]
};
</script>
