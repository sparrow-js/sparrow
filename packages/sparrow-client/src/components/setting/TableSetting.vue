<template>
  <div class="setting">
    <div v-show="showSetting">
      <el-form size="small" label-width="90px">
        <el-form-item 
          v-if="config._custom['label']!==undefined"
          label="label"
        >
          <el-input v-model="config._custom['label']"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { SettingModule } from '@/store/modules/setting';
import { AppModule } from '@/store/modules/app';
import socket from '@/util/socket.js';
import JsonHandler from '@/components/jsonhandler/index.vue';
import JsonEditor from '@/components/JsonEditor/index.vue';

@Component({
  name: 'Setting',
  components: {
    JsonHandler,
    JsonEditor
  }
})
export default class extends Vue {
  @Prop({ default: () => null }) private config: any;
  @Prop({default: ''}) private uuid: string;

  private activeNames = ['1', '2', '3'];


  private activeNameCode = 'code';
  private urlHeader = '';
  private showExportPopover = false;

  get showSetting() {
    return SettingModule.showSetting;
  }

  private async created() {
    await this.getSetting();

    window.addEventListener('message', async event => {
      const { data } = event;
      if (data.handler === 'client.component.insertTableHeader') {
        const { params } = data.data;
        this.config._custom['label'] = params.value;
        this.updateSetting();
      }
    });
  }

  private async getSetting() {
    const result = await socket.emit('generator.scene.getSetting', {
      boxUuid: AppModule.boxUuid,
    });
  }

  private async updateSetting() {
    const result = await socket.emit('generator.scene.setting', {
      boxUuid: AppModule.boxUuid,
      data: {
        handler: 'settingConfig',
        uuid: this.uuid,
        config: this.config
      }
    });
  }

}
</script>
<style lang="scss" scoped>
.setting {
  width: 100%;
  background: #fff;
  padding: 10px 6px;
  box-sizing: border-box;
}
.update-data {
  margin-left: 10px;
  color: #409eff;
  :hover {
    color: #66b1ff;
  }
}
.mt6{
  margin-top: 6px;
}
</style>
