<template>
  <div class="paragraph">
    <div class="paragraph-edit" contenteditable="true" @focus="focus"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'

@Component
export default class Paragraph extends Vue {
  private focus () {
    AppModule.SetShowDashboard(true);
  }
}
</script>
<style lang="scss" scoped>
.paragraph{
  height: 48px;
  box-sizing: border-box;
  padding: 5px;
  &-edit{
    width: 100%;
    height: 100%;
    outline: none;
  }
}
</style>