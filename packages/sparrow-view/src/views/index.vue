<template>
  <div class="home drag-box" data-id="8ca47af5">
    <box
      data-id="a47af570"
      :uuid="'a47af570'"
      class="block-item"
      :label="'Row'"
    >
      <div class="box">
        <el-row>
          <el-col span="6">
            <box
              data-id="f57055ff"
              :uuid="'f57055ff'"
              class="block-item"
              label="column"
            >
              <div class="column drag-box" data-id="f57055ff">
                <div class="empty-container">empty</div>
              </div>
            </box>
          </el-col>

          <el-col span="12">
            <box
              data-id="55ff61cc"
              :uuid="'55ff61cc'"
              class="block-item"
              label="column"
            >
              <div class="column drag-box" data-id="55ff61cc">
                <div class="empty-container">empty</div>
              </div>
            </box>
          </el-col>
        </el-row>
      </div>
    </box>
  </div>
</template>

<script>
export default {
  methods: {},

  data() {
    return {};
  }
};
</script>
