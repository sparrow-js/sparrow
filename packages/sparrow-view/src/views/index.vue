<template>
  <div class="home">
    <div class="block-list">
      <BasicTable />
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
