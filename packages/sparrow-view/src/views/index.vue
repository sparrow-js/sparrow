<template>
  <div class="home">
    <div class="block-list">
      <box :index="0" :label="'表格'" class="block-item">
        <BasicTable />
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
import BasicTable from "./components/BasicTable";
import generatorMixin from "../mixins/generatorMixin";
export default {
  components: {
    BasicTable
  },
  mixins: [generatorMixin]
};
</script>
