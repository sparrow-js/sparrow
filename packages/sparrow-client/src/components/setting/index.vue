<template>
  <div class="setting">
    <div 
      @click="showSettingHandler"
    >
      <span class="el-icon-s-fold"></span>
    </div>
    <div v-if="settingComponent">
      <component  v-bind:is="settingComponent"></component>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { SettingModule } from '@/store/modules/setting';
import { AppModule } from '@/store/modules/app';
import FormSetting from './FormSetting.vue';

@Component({
  name: 'Setting',
  components: {
    FormSetting
  },
})
export default class extends Vue {

  get showSetting () {
    return SettingModule.showSetting;
  }

  get settingComponent () {
    return SettingModule.settingComponent;
  }
  
  private showSettingHandler () {
    SettingModule.setShowSettingHandler(!SettingModule.showSetting);
  }

}
</script>
<style lang="scss" scoped>
.setting{
  width: 100%;
  background: #fff;
  padding: 10px 6px;
  box-sizing: border-box;
}
.update-data{
  margin-left: 10px;
  color: #409eff;
  :hover{
    color: #66b1ff;
  }
}
</style>