<template>
  <div class="setting">

    <div class="setting-comp" v-if="settingComponent">
      <component 
        v-bind:is="settingComponent"
        :config="config"
        :uuid="uuid"
      ></component>
    </div>
   

  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { SettingModule } from '@/store/modules/setting';
import { AppModule } from '@/store/modules/app';
import FormSetting from './FormSetting.vue';
import TableSetting from './TableSetting.vue';
import socket from '@/util/socket.js';

@Component({
  name: 'Setting',
  components: {
    FormSetting,
    TableSetting
  }
})
export default class extends Vue {
  private config = null;
  private uuid = '';
  private innerDrawer = false;
  private dataCode = `var data = {}`

  get showSetting() {
    return SettingModule.showSetting;
  }

 

  get showCodeDraw() {
    return SettingModule.showCodeDraw;
  }

  set showCodeDraw (value) {
    SettingModule.setShowCodeBraw(value);
  }
  
  private async created() {
    window.addEventListener('message', async event => {
      const { data } = event;
      if (!data.handler) return;
      if(data.handler === 'client.component.getConfig') {
        const {params} = data.data;
        this.uuid = params.uuid;
        const res = await socket.emit('generator.scene.getBoxChildConfig', {
          boxIndex: AppModule.boxIndex,
          boxUuid: AppModule.boxUuid,
          uuid: params.uuid
        });
        this.config = res;
        AppModule.setUuid(this.uuid);
      }
    })
  }

  get settingComponent() {
    return SettingModule.settingComponent;
  }

  private showSettingHandler() {
    SettingModule.setShowSettingHandler(!SettingModule.showSetting);
  }
}
</script>
<style lang="scss">
.setting {
  width: 100%;
  background: #fff;
  padding: 0px 6px;
  box-sizing: border-box;
}
.update-data {
  margin-left: 10px;
  color: #409eff;
  :hover {
    color: #66b1ff;
  }
}
.setting-comp{
  width: 260px;
}

</style>
