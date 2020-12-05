<template>
  <div class="home">test</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Observer } from 'mobx-vue';

@Observer
@Component
export default class App extends Vue {
  mounted() {}
}
</script>
