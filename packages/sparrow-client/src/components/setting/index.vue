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
<style lang="scss" scoped>
.setting {
  background: #fff;
  box-sizing: border-box;
  height: calc(100% - 3px);
   &__title {
    padding: 5px 0;
    margin: 0 5px;
    border-bottom: 1px solid #409eff;
    color: #409eff;
    font-size: 16px;
  }
  .CodeMirror{
    width: 245px;
    height: 300px;
  }
}
</style>
