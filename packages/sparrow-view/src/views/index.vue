<template>
  <div class="home">
    <div class="block-list">
      <box :index="0" :label="'表单'" class="block-item">
        <Basic />
      </box>
    </div>

    <div class="block-list">
      <box :index="1" :label="'表格'" class="block-item">
        <BasicTable />
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
import BasicTable from "./components/BasicTable";
import Basic from "./components/Basic";
import generatorMixin from "../mixins/generatorMixin";
export default {
  components: {
    Basic,
    BasicTable
  },
  mixins: [generatorMixin]
};
</script>
