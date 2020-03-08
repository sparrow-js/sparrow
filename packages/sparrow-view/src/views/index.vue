<template>
  <div class="home">
    <div class="block-list">
      <box :index="0" class="block-item">
        <BasicForm />
      </box>
    </div>

    <div class="block-list">
      <box :index="1" class="block-item">
        <SearchBox />
      </box>
    </div>

    <div class="block-list">
      <box :index="2" class="block-item">
        <paragraph />
      </box>
    </div>
  </div>
</template>

<script>
import SearchBox from "./components/SearchBox";
import BasicForm from "./components/BasicForm";
import generatorMixin from "../mixins/generatorMixin";
export default {
  components: {
    BasicForm,
    SearchBox
  },
  mixins: [generatorMixin]
};
</script>
