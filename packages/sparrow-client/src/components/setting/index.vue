<template>
  <div class="setting">
    <div 
      @click="showSettingHandler"
    >
      <span class="el-icon-s-fold"></span>
    </div>
    <div v-show="showSetting">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="模式" name="1">
          <el-switch
            v-model="inline"
            active-text="块"
            inactive-text="行内"
            @change="displayChange"
          >
          </el-switch>
        </el-collapse-item>
        <el-collapse-item title="data" name="2">
          <template slot="title">
            <span>data</span>
            <span class="update-data">更新</span>
          </template>
          <codemirror v-model="code"></codemirror>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { SettingModule } from '@/store/modules/setting';
import socket from '@/util/socket.js';


@Component({
  name: 'Setting',
})
export default class extends Vue {
  private code = `var data = {};`;
  private activeNames = ['1', '2'];
  private inline = false;

  get showSetting () {
    return SettingModule.showSetting;
  }
  
  private showSettingHandler () {
    SettingModule.setShowSettingHandler(!SettingModule.showSetting);
  }

  private async displayChange () {
    await socket.emit('generator.scene.setting', {
      inline: this.inline,
      code: this.code,
    });
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