<template>
  <div class="setting">
    <FormSetting 
      :config="config"
      :uuid="uuid"
    ></FormSetting>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { SettingModule } from '@/store/modules/setting';
import { AppModule } from '@/store/modules/app';
import FormSetting from './FormSetting.vue';
// import TableSetting from './TableSetting.vue';
// import TabsSetting from './TabsSetting.vue';
import socket from '@/util/socket.js';
import Toolbox from './Toolbox';

@Component({
  name: 'Setting',
  components: {
    FormSetting,
    // TableSetting,
    // TabsSetting,
    Toolbox,
  }
})
export default class extends Vue {
  private uuid = '';
  private innerDrawer = false;
  private dataCode = `var data = {}`
  private activeTreeIndex = 0;

  get config () {
    return SettingModule.config;
  }

  private async created() {  }

}
</script>
<style lang="scss">
.setting {
  background: #fff;
  box-sizing: border-box;
  height: 100%;
   &__title {
    padding: 5px 0;
    margin: 0 5px;
    border-bottom: 1px solid #409eff;
    color: #409eff;
    font-size: 16px;
  }
  .CodeMirror{
    width: 245px;
    height: 300px;
  }
}
.update-data {
  margin-left: 10px;
  color: #409eff;
  :hover {
    color: #66b1ff;
  }
}
.no-data{
  padding: 10px;
  color: #909399;
}

.tabs {
  margin-right: 5px;
  flex-shrink: 0;
  color: #909399;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  padding-top: 20px;
}

.tabs-item {
  padding: 10px;
  .iconfont {
    font-size: 20px;
  }
}
.active.tabs-item {
  background-color: #f0f9eb;
}
.active .iconfont {
  color: #409EFF;
}
.tabs-body{
  flex: 1;
  width: 200px;
}
</style>
