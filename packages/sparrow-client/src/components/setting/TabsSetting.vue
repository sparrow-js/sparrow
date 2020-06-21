<template>
  <div class="setting">
    <div v-show="showSetting">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="标签数据" name="1">
          <div>
            <span class="update-data" @click.stop="updateCodeData">更新</span>
            <span class="update-data" @click="showExportPopover = true">导入</span>
          </div>
          <div style="height: 300px;overflow: scroll;">
            <div v-if="config._slot">
              <codemirror
                v-model="config._slot.data"
              ></codemirror>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
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
      boxIndex: AppModule.boxIndex,
      boxUuid: AppModule.boxUuid,
    });
    if (result && result._slot) {
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
