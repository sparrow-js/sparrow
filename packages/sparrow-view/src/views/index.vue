<template>
  <div class="home drag-box" data-id="60c47449">
    <box
      data-id="8f4f5b09"
      :uuid="'8f4f5b09'"
      class="block-item"
      :label="'Table'"
    >
      <div class="box">
        <template>
          <div class="root">
            <table-box>
              <el-table :border="true" style="width: 100%" :data="list">
                <el-table-column label="">
                  <template slot="header" slot-scope="{ row, column, $index }">
                    <edit-text-box uuid="4f5b099f" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="4f5b099f"
                      :uuid="'4f5b099f'"
                      class="block-item"
                      label="col"
                    >
                      <div class="drag-box" data-id="4f5b099f">
                        <div class="empty-container">empty</div>
                      </div>
                    </box>
                  </template>
                </el-table-column>

                <el-table-column label="">
                  <template slot="header" slot-scope="{ row, column, $index }">
                    <edit-text-box uuid="5b099fd4" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="5b099fd4"
                      :uuid="'5b099fd4'"
                      class="block-item"
                      label="col"
                    >
                      <div class="drag-box" data-id="5b099fd4">
                        <div class="empty-container">empty</div>
                      </div>
                    </box>
                  </template>
                </el-table-column>

                <el-table-column label="">
                  <template slot="header" slot-scope="{ row, column, $index }">
                    <edit-text-box uuid="099fd494" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="099fd494"
                      :uuid="'099fd494'"
                      class="block-item"
                      label="col"
                    >
                      <div class="drag-box" data-id="099fd494">
                        <div class="empty-container">empty</div>
                      </div>
                    </box>
                  </template>
                </el-table-column>

                <el-table-column label="">
                  <template slot="header" slot-scope="{ row, column, $index }">
                    <edit-text-box uuid="9fd494d1" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="9fd494d1"
                      :uuid="'9fd494d1'"
                      class="block-item"
                      label="col"
                    >
                      <div class="drag-box" data-id="9fd494d1">
                        <div class="empty-container">empty</div>
                      </div>
                    </box>
                  </template>
                </el-table-column>

                <el-table-column label="">
                  <template slot="header" slot-scope="{ row, column, $index }">
                    <edit-text-box uuid="d494d14c" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="d494d14c"
                      :uuid="'d494d14c'"
                      class="block-item"
                      label="col"
                    >
                      <div class="drag-box" data-id="d494d14c">
                        <div class="empty-container">empty</div>
                      </div>
                    </box>
                  </template>
                </el-table-column>
              </el-table>
            </table-box>
          </div>
        </template>
      </div>
    </box>

    <div />
  </div>
</template>

<script>
export default {
  components: {},
  methods: {},

  data() {
    return {
      list: [{}]
    };
  }
};
</script>
<style lang="scss" scoped></style>
