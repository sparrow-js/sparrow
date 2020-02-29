<template>
  <div class="setting">
    <div v-show="showSetting">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="模式" name="1">
          <el-switch
            v-model="setting.inline"
            active-text="块"
            inactive-text="行内"
            @change="displayChange"
          >
          </el-switch>
        </el-collapse-item>
        <el-collapse-item title="数据" name="2">
          <el-tabs v-model="activeNameCode" @tab-click="handleCodeClick">
            <el-tab-pane label="code" name="code">
              <div>
                <span class="update-data"
                  @click.stop="updateCodeData"
                >更新</span>
              </div>
              <codemirror 
                ref="codemirror"
                v-model="setting.dataCode"
                @cursorActivity="focusCode"
                @dblclick="dblclickCode"
                @change="beforeSelectionChange"
                @scrollCursorIntoView="gutterClick"
              ></codemirror>
            </el-tab-pane>
            <el-tab-pane label="json" name="json">
              <json-handler :json-data="jsonData"></json-handler>
            </el-tab-pane>
          </el-tabs>
        </el-collapse-item>
        <!--  -->
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

@Component({
  name: 'Setting',
  components: {
    JsonHandler
  }
})
export default class extends Vue {
  private activeNames = ['1', '2', '3'];
  private setting = {
    dataCode: '',
    inline: false
  };

  private jsonData = '"{}"'

  private activeNameCode = 'code';


  get showSetting () {
    return SettingModule.showSetting;
  }

  private async created () {
    const result = await socket.emit('generator.scene.getSetting', {
      boxIndex: AppModule.boxIndex
    });
    if (result) {
      this.setting = result.data;
    }
  }

  private showSettingHandler () {
    SettingModule.setShowSettingHandler(!SettingModule.showSetting);
  }

  private async displayChange () {
    const result = await socket.emit('generator.scene.setting', {
      boxIndex: AppModule.boxIndex,
      data: {
        handler: 'formInline',
        key: ':inline',
        value: this.setting.inline,
      }
    });

    if (result && result.status === 0) {
      this.$message({
        message: '操作成功',
        type: 'success'
      });
    }
  }

  private async updateCodeData () {
    
   const result =  await socket.emit('generator.scene.setting', {
      boxIndex: AppModule.boxIndex,
      data: {
        handler: 'data',
        code: this.setting.dataCode,
      }
    });

    if (result && result.status === 0) {
      this.$message({
        message: '操作成功',
        type: 'success'
      });
    }
  }

  private focusCode (data) {}

  private dblclickCode (instance, event) {}

  private beforeSelectionChange (doc, selection) {
    console.log('**********************')
  }

  private gutterClick () {
    console.log('gutterClick gutterClick')
  }

  private handleCodeClick () {
    if (this.activeNameCode === 'json') {
      console.log(`function getData () {${this.setting.dataCode} return data;} getData()`);
      this.jsonData = JSON.stringify(eval(`function getData () {${this.setting.dataCode}; return data;} getData()`))
    }
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