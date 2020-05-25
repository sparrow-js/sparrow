<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px">
        <div style="margin-bottom: 20px;">
          <tabs-box
            :list="[
              {
                label: '配置管理',
                value: 'second'
              },
              {
                label: '时任务补偿',
                value: 'fourth'
              }
            ]"
            :uuid="'1fc76e2f'"
            :active-name="'fourth'"
          >
            <div slot="tab_second">
              <div style="margin-top: 20px;">
                <logic-box :uuid="'6e2fc245'" :label="'tab_item'" />
              </div>
            </div>

            <div slot="tab_fourth">
              <div style="margin-top: 20px;">
                <logic-box :uuid="'45de6d10'" :label="'tab_item'" />
              </div>
            </div>
          </tabs-box>
        </div>

        <div style="margin-bottom: 20px;">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <label-box label="卡片名称" uuid="103c50f7" :clear-class="true" />
            </div>
            <div>
              <logic-box :uuid="'103c50f7'" :label="'card'" />
            </div>
          </el-card>
        </div>
      </el-form>
    </box-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: ""
      }
    };
  }
};
</script>
