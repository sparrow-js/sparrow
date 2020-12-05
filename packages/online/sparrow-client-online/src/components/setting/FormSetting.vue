<template>
  <div class="setting-box">
    <div style="height: 100%;">
      <div>
        <span class="update-data" @click.stop="syncConfig">更新</span>
      </div>
      <el-divider></el-divider>
      <div class="generator-box" v-if="config && config.schema && config.model">
        <vue-form-generator 
          :schema="config.schema" 
          :model="config.model" 
          :options="formOptions"
        ></vue-form-generator>
      </div>
    </div>
    <div class="drawer">
      <!-- <el-drawer
        title=""
        :visible.sync="showCodeDraw"
        :append-to-body="true"
        :modal="false"
        custom-class="drawer-st"
        >

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
      </el-drawer> -->
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { SettingModule } from '@/store/modules/setting';
import { AppModule } from '@/store/modules/app';
import JsonHandler from '@/components/jsonhandler/index.vue';
import RuleList from './RuleList.vue';
import _ from 'lodash';
import Message from '../../util/MessageWorker'

@Component({
  name: 'Setting',
  components: {
    JsonHandler,
    RuleList
  }
})
export default class extends Vue {
  // @Prop({ default: () => null }) private config: any;
  // @Prop({default: ''}) private uuid: string;

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
  private uuid = '';
  private config = {
    model: {
      attr: {}
    }
  };

  private formOptions = {
    validateAfterLoad: true,
    validateAfterChanged: true,
    validateAsync: true
  };

  private async created() {

    // window.EventCustomer.addListener('click_json_tree_callback', data => {
    //   try {
    //     this.$set(this.config.model.attr, 'v-model', data.path === 'JSON' ? '' : data.path.replace('JSON.', ''))
    //     // this.config.model.attr['v-model'] = data.path === 'JSON' ? '' : data.path.replace('JSON.', '');
    //   } catch (e) {}
      
    // })

    Message.on('client.dispatch.component', async (data) => {
      this.uuid = _.get(data, 'data.params.uuid');

      const result = await Message.emit('generator.scene.getConfig', {
        uuid: this.uuid,
      });
      AppModule.setActiveCompId(this.uuid);
      this.config = result.data;
      this.$emit('change', {id: this.uuid});
      this.refresh();
    });

    Message.on('client.dispatch.box', async (data) => {
      this.uuid = _.get(data, 'data.params.uuid');
      AppModule.setActiveCompId(this.uuid);
      const result = await Message.emit('generator.scene.getConfig', {
        uuid: _.get(data, 'uuid'),
      });
      this.config = result.data;
      this.$emit('change', {id: this.uuid});
      this.refresh();
    })
  }

  private refresh () {
    const codemirror: any = this.$refs.codemirror;
    if (codemirror) codemirror.codemirror.refresh();
  }

  private showSettingHandler() {
    SettingModule.setShowSettingHandler(!SettingModule.showSetting);
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


  private handleClick () {}

  private async syncConfig () {
    if (!this.uuid || !this.config) return;
     const result = await Message.emit('generator.scene.settingConfig', {
      boxUuid: AppModule.boxUuid,
      data: {
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
.vue-form-generator .field-wrap{
  margin-top: 5px;
}
.array-button-add{
  margin-top: 10px !important;
}
</style>
<style lang="scss" scoped>
.setting-box {
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  height: 100%;
}
.update-data {
  margin-left: 10px;
  color: #409eff;
  cursor: pointer;
  :hover {
    color: #66b1ff;
  }
}
.codemirror-operate{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.generator-box{
  height: calc(100% - 100px);
  padding-bottom: 50px;
  overflow: scroll;
}

</style>