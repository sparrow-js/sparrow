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
        <el-collapse-item title="data" name="2">
          <template slot="title">
            <span>data</span>
            <span class="update-data"
              @click.stop="updateCodeData"
            >更新</span>
          </template>
          <codemirror 
            ref="codemirror"
            v-model="setting.dataCode"
            @cursorActivity="focusCode"
            @dblclick="dblclickCode"
            @change="beforeSelectionChange"
            @scrollCursorIntoView="gutterClick"
          ></codemirror>
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

@Component({
  name: 'Setting',
})
export default class extends Vue {
  private activeNames = ['1', '2'];
  private setting = {
    dataCode: '',
    inline: false
  };


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
    console.log(this.setting);
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

  private focusCode (data) {
    // console.log(this.$refs.codemirror)
    // console.log('******8*****');
    // // console.log(data);
    // // console.log(data.doc.getCursor());
  }

  private dblclickCode (instance, event) {
    // console.log(instance)
    // console.log(event)
  }

  private beforeSelectionChange (doc, selection) {
    console.log('**********************')
    // console.log(doc.getSelection());
    // console.log(selection);
  }

  private gutterClick () {
    console.log('gutterClick gutterClick')
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