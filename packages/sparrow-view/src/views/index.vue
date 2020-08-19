<template>
  <div class="home drag-box" data-id="3d86b1c2">
    <box
      data-id="86b1c203"
      :uuid="'86b1c203'"
      class="block-item"
      :label="'Table'"
    >
      <div class="box">
        <template>
          <div class="root">
            <table-box>
              <el-table border="true" style="width: 100%" :data="tableData">
                <el-table-column label="">
                  <template slot="header" slot-scope="{ row, column, $index }">
                    <edit-text-box uuid="036d1f06" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="036d1f06"
                      :uuid="'036d1f06'"
                      class="block-item"
                      label="column"
                    >
                      <div class="drag-box">
                        <div class="empty-container">empty</div>
                      </div>
                    </box>
                  </template>
                </el-table-column>

                <el-table-column label="">
                  <template slot="header" slot-scope="{ row, column, $index }">
                    <edit-text-box uuid="1f066c92" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="1f066c92"
                      :uuid="'1f066c92'"
                      class="block-item"
                      label="column"
                    >
                      <div class="drag-box">
                        <div class="empty-container">empty</div>
                      </div>
                    </box>
                  </template>
                </el-table-column>

                <el-table-column label="">
                  <template slot="header" slot-scope="{ row, column, $index }">
                    <edit-text-box uuid="6c9229d9" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="6c9229d9"
                      :uuid="'6c9229d9'"
                      class="block-item"
                      label="column"
                    >
                      <div class="drag-box">
                        <div class="empty-container">empty</div>
                      </div>
                    </box>
                  </template>
                </el-table-column>

                <el-table-column label="">
                  <template slot="header" slot-scope="{ row, column, $index }">
                    <edit-text-box uuid="29d945ea" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="29d945ea"
                      :uuid="'29d945ea'"
                      class="block-item"
                      label="column"
                    >
                      <div class="drag-box">
                        <div class="empty-container">empty</div>
                      </div>
                    </box>
                  </template>
                </el-table-column>

                <el-table-column label="">
                  <template slot="header" slot-scope="{ row, column, $index }">
                    <edit-text-box uuid="45ea4a07" :label="column.label" />
                  </template>

                  <template slot-scope="{ row, column, $index }">
                    <box
                      data-id="45ea4a07"
                      :uuid="'45ea4a07'"
                      class="block-item"
                      label="column"
                    >
                      <div class="drag-box">
                        <div class="empty-container">empty</div>
                      </div>
                    </box>
                  </template>
                </el-table-column>
              </el-table>
            </table-box>
            <div class="other" />
          </div>
        </template>
      </div>
    </box>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {},

  data() {
    return {
      tableData: [{}]
    };
  }
};
</script>
<style lang="scss" scoped></style>
