<template>
  <div class="setting">
    <div v-show="showSetting">
      <el-form v-if="config" size="small" label-width="90px">
        <el-form-item 
          v-if="config._custom['label']!==undefined"
          label="label"
        >
          <el-input v-model="config._custom['label']"></el-input>
        </el-form-item>
      </el-form>
      <!-- <div class="column-list" v-if="config.columns">
        <div class="column-item" v-for="item in config.columns" :key="item.uuid">
          <span>column1</span>
          <div class="column-item__operate">
            <i class="el-icon-remove column-item__operate-icon" @click="deleteColumn(item.uuid)"></i>
            <i class="el-icon-circle-plus column-item__operate-icon"></i>
          </div>
        </div>
      </div> -->
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

  private beforeDestroy () {
    this.$root.$emit('setting-before-destroy');
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
// .column-list{
//   display: flex;
//   flex-wrap: wrap;
// }
// .column-item{
//   width: 160px;
//   padding: 6px;
//   display: flex;
//   border: 1px solid #DCDFE6;
//   margin-bottom: 5px;
//   justify-content: space-around;
//   font-size: 16px;
//   color: #909399;
//   border-radius: 3px;
//   &__operate-icon{
//     margin-left: 5px;
//   }
//   &__operate-icon:hover{
//     color: #F56C6C;
//   }
//   &__operate{
//     color: #909399;
//     cursor: pointer;
//   }
// }
</style>
