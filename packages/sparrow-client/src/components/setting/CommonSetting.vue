<template>
  <div class="setting">
    <div v-show="showSetting">
      <div class="operate">
        <span class="update-data" @click.stop="updateCodeData">更新</span>
      </div>
      <el-form size="small" label-width="80px" :label-position="'left'">
        <div  v-if="config._attr">
          <el-form-item
              
              v-if="config._attr['label']!==undefined"
              label="标题"
            >
            <el-input v-model="config._attr['label']"></el-input>
          </el-form-item>

        </div>
        <div  v-if="config._custom">
          <el-form-item v-if="config._custom.hasHeader!==undefined" label="卡片头">
            <el-switch v-model="config._custom.hasHeader"></el-switch>
          </el-form-item>
        </div>
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
  private activeNames = ['1', '2', '3'];
  private setting = {
    dataCode: '',
    inline: false
  };

  private config: any = {};

  private activeNameCode = 'code';
  private urlHeader = '';
  private showExportPopover = false;

  get showSetting() {
    return SettingModule.showSetting;
  }

  private async created() {
    await this.getSetting();
  }

  private async getSetting() {
    const result = await socket.emit('generator.scene.getSetting', {
      boxUuid: AppModule.boxUuid,
    });
    if (result) {
      this.config = result;
    }
  }

  private async updateSetting() {
    const result = await socket.emit('generator.scene.setting', {
      boxIndex: AppModule.boxIndex,
      boxUuid: AppModule.boxUuid,
      data: {
        handler: 'settingConfig',
        config: this.config
      }
    });
    this.getSetting();
  }

  private async updateCodeData() {
    this.updateSetting();
    this.$message({
      message: '操作成功',
      type: 'success'
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
.operate{
  border-bottom: 1px solid #409eff;
  padding-bottom: 10px;
  margin-bottom: 10px;
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
