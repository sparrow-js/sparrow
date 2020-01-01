<template>
  <div class="home">
    <BasicForm />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import BasicForm from '../../BasicForm/src';

export default {
  name: "home",
  components: {
    BasicForm
  }
};
</script>
