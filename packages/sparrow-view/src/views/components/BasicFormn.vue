<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px">
        <div style="margin-bottom: 20px;">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <label-box label="卡片名称" uuid="1546ea50" :clear-class="true" />
            </div>
            <div class="card-content">
              <logic-box :uuid="'1546ea50'" :label="'card'" />
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
    return {};
  }
};
</script>
