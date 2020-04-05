<template>
  <div class="setting">
    <div v-show="showSetting">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="表头数据" name="1">
          <div>
            <span class="update-data"
              @click.stop="updateCodeData"
            >更新</span>
          </div>
          <json-editor v-model="jsonData"></json-editor>
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
import JsonEditor from '@/components/JsonEditor';

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

  private jsonData:any = [];

  private activeNameCode = 'code';


  get showSetting () {
    return SettingModule.showSetting;
  }

  private async created () {
  await this.getSetting();
      
    window.addEventListener("message", async event => {
      const {data} = event;
      if (data.handler === 'client.component.insertTableHeader') {
        const {params} = data.data;
        const jsonData = JSON.parse(this.jsonData)
        // const jsonData = JSON.parse()
        const index = jsonData.findIndex(item => item.uuid === params.uuid);
        if (index >= 0) {
          jsonData[index].label = params.value;
        }
        this.jsonData = jsonData;
        this.updateSetting();
      }
    })
  }

  private async getSetting () {
    const result = await socket.emit('generator.scene.getSetting', {
      boxIndex: AppModule.boxIndex
    });
    if (result) {
      this.jsonData = JSON.parse(result.data.headerData);
    }
  }

  private async updateSetting () {
      if (typeof this.jsonData === 'string') {
        this.jsonData = JSON.parse(this.jsonData);
      } 
     const result =  await socket.emit('generator.scene.setting', {
      boxIndex: AppModule.boxIndex,
      data: {
        handler: 'setHeaderData',
        code: this.jsonData,
      }
    });
    this.getSetting();
  }

  private async updateCodeData () {
    this.updateSetting();
    this.$message({
      message: '操作成功',
      type: 'success'
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