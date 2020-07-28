<template>
  <div class="setting">
    <Toolbox />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Toolbox from './Toolbox';

@Component({
  name: 'Setting',
  components: {
    Toolbox
  }
})
export default class extends Vue {}
</script>
