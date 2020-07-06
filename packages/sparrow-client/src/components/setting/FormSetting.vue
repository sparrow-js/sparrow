<template>
  <div class="setting">
    <div v-show="showSetting">
      <el-tabs v-model="tabActiveName" @tab-click="handleClick">
        <el-tab-pane label="组件" name="first">
          <div>
            <span class="update-data" @click.stop="syncConfig">更新</span>
          </div>
          <el-scrollbar v-if="config" class="right-scrollbar">
            <el-form size="small" label-width="90px">
              <el-form-item 
                v-if="config._attr['v-model']!==undefined"
                label="v-model"
              >
                <el-input v-model="config._attr['v-model']" :disabled="true"></el-input>
              </el-form-item>
  

              <el-form-item 
                v-if="config._attr[':list']!==undefined"
                label=":list"
              >
                <el-input v-model="config._attr[':list']" :disabled="true"></el-input>
              </el-form-item>


              <el-tabs
                v-if="config._attr[':default']!==undefined"
                v-model="activeItemCode" @tab-click="handleCodeItemClick">
                <el-tab-pane label="code" name="code">
                  <div class="codemirror-operate">
                    <i class="iconfont icon-iconfront-" @click="expansionHandler('form')"></i>
                  </div>
                  <codemirror
                    ref="codemirror"
                    v-model="config._attr[':default']"
                  ></codemirror>
                </el-tab-pane>
                <el-tab-pane label="json" name="json">
                  <json-handler :json-data="jsonItemData"></json-handler>
                </el-tab-pane>
              </el-tabs>

   
              <el-form-item 
                v-if="config._attr.placeholder!==undefined"
                label="placeholder"
              >
                <el-input v-model="config._attr.placeholder" placeholder="请输入内容"></el-input>
              </el-form-item>

              <el-form-item 
                v-if="config._attr['v-if']!==undefined"
                label="v-if"
              >
                <el-input v-model="config._attr['v-if']" placeholder="请输入内容"></el-input>
              </el-form-item>
              
              <div  v-if="config._custom">
                <el-form-item v-if="config._custom.hasHeader!==undefined" label="卡片头">
                  <el-switch v-model="config._custom.hasHeader"></el-switch>
                </el-form-item>


                <div v-if="config._custom.required">
                  <el-divider content-position="left">校验</el-divider>
                  <el-form-item v-if="config._custom.required!==undefined" label="必填">
                    <el-switch v-model="config._custom.required"></el-switch>
                  </el-form-item>
                  <rule-list 
                    v-if="config._custom.regList!==undefined"
                    :rules.sync="config._custom.regList"
                  ></rule-list>
                </div>

              </div>
            

              <div v-if="config._slot">
                <el-divider content-position="left">options</el-divider>
                <div>
                  <i class="iconfont icon-iconfront-" @click="expansionHandler('formItem')"></i>
                </div>
                <el-form-item 
                  v-if="config._slot.data!==undefined"
                  label=""
                  label-width="0"
                >
                    <codemirror
                      v-model="config._slot.data"
                    ></codemirror>
                </el-form-item>
              </div>
      
            </el-form>
          </el-scrollbar>

        </el-tab-pane>
        <el-tab-pane label="表单" name="second">
          <el-collapse v-if="setting" v-model="activeNames">
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
                  <div class="codemirror-operate">
                    <span class="update-data" @click.stop="updateCodeData"
                      >更新</span
                    >
                    <i class="iconfont icon-iconfront-" @click="expansionHandler('form')"></i>
                  </div>
                  <codemirror
                    v-if="tabActiveName === 'second'"
                    ref="codemirror"
                    v-model="setting.dataCode"
                  ></codemirror>
                </el-tab-pane>
                <el-tab-pane label="json" name="json">
                  <json-handler :json-data="jsonData"></json-handler>
                </el-tab-pane>
              </el-tabs>
            </el-collapse-item>
          </el-collapse>

        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="drawer">
      <el-drawer
        title=""
        :visible.sync="showCodeDraw"
        :append-to-body="true"
        :modal="false"
        custom-class="drawer-st"
        >
        <!-- <div slot="title">
          <el-button size="mini" type="primary" @click="sureCodeHandler">确定</el-button>
        </div> -->
        <div>
          <codemirror
            v-if="codeEditType === 'form'"
            v-model="setting.dataCode"
          ></codemirror>

          <codemirror
            v-if="codeEditType === 'formItem'"
            v-model="config._slot.data"
          ></codemirror>
        </div>
      </el-drawer>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { SettingModule } from '@/store/modules/setting';
import { AppModule } from '@/store/modules/app';
import socket from '@/util/socket.js';
import JsonHandler from '@/components/jsonhandler/index.vue';
import RuleList from './RuleList.vue';

@Component({
  name: 'Setting',
  components: {
    JsonHandler,
    RuleList
  }
})
export default class extends Vue {
  @Prop({ default: () => null }) private config: any;
  @Prop({default: ''}) private uuid: string;

  private activeNames = ['1', '2', '3'];
  private setting = {
    dataCode: '',
    inline: false
  };

  private tabActiveName = 'first';

  private jsonData = '"{}"';
  private jsonItemData = '"{}"';

  private activeNameCode = 'code';
  private activeItemCode = 'code';

  private tempCode = '';
  private showCodeDraw = false;

  private codeEditType = '';


  // @Watch('config', { immediate: true, deep: true})
  // private onConfigChange() {
  //   this.syncConfig();
  // }



  get showSetting() {
    return SettingModule.showSetting;
  }

  private async created() {
    const result = await socket.emit('generator.scene.getSetting', {
      boxUuid: AppModule.boxUuid,
    });
    if (result) {
      this.setting = result.data;
    }
    if(!this.uuid) {
      this.tabActiveName = 'second';
    }
  }

  private showSettingHandler() {
    SettingModule.setShowSettingHandler(!SettingModule.showSetting);
  }

  private async displayChange() {
    const result = await socket.emit('generator.scene.setting', {
      boxUuid: AppModule.boxUuid,
      data: {
        handler: 'formInline',
        key: ':inline',
        value: this.setting.inline
      }
    });

    if (result && result.status === 0) {
      this.$message({
        message: '操作成功',
        type: 'success'
      });
    }
  }

  private async updateCodeData() {
    const result = await socket.emit('generator.scene.setting', {
      boxUuid: AppModule.boxUuid,
      data: {
        handler: 'data',
        code: this.setting.dataCode
      }
    });

    if (result && result.status === 0) {
      this.$message({
        message: '操作成功',
        type: 'success'
      });
    }
  }


  private handleCodeClick() {
    if (this.activeNameCode === 'json') {
      this.jsonData = JSON.stringify(
        eval(
          `function getData () {${this.setting.dataCode}; return data;} getData()`
        )
      );
    }
  }

  private handleCodeItemClick() {
    if (this.activeItemCode === 'json') {
      this.jsonItemData = JSON.stringify(
        eval(
          `function getData () {${this.config._attr[':default']}; return data;} getData()`
        )
      );
    }
  }


  private handleClick () {

  }

  private async syncConfig () {
    if (!this.uuid || !this.config) return;
     const result = await socket.emit('generator.scene.setting', {
      boxUuid: AppModule.boxUuid,
      data: {
        handler: 'settingConfig',
        uuid: this.uuid,
        config: this.config
      }
    });
  }

  private expansionHandler (codeEditType) {
    this.showCodeDraw = true;
    this.codeEditType = codeEditType;
  }

  private sureCodeHandler () {
    this.showCodeDraw = false;
    this.setting.dataCode = this.tempCode;
  }
}
</script>
<style lang="scss">
.drawer-st{
  right: 290px !important;
  width: 500px !important;
}
</style>
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
.codemirror-operate{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
