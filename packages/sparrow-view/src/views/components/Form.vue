<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px"
        ><component-box indexcomp="0" uuid="4c381af2">
          <div style="margin-bottom: 20px;">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <label-box
                  label="卡片名称"
                  uuid="4c381af2"
                  :clear-class="true"
                />
              </div>

              <div class="card-content">
                <logic-box :uuid="'4c381af2'" :label="'card'" />
              </div>
            </el-card>
          </div> </component-box
      ></el-form>
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
