<template>
  <div class="home drag-box" data-id="1940115b">
    <box
      data-id="115b34e0"
      :uuid="'115b34e0'"
      class="block-item"
      :label="'box'"
    >
      <div>
        <div class="drag-box" data-id="115b34e0">
          <component-box uuid="5b34e04a">
            <div class="box">
              <template>
                <div class="root">
                  <table-box>
                    <el-table border="" style="width: 100%" :data="tableData">
                      <el-table-column label="">
                        <template
                          slot="header"
                          slot-scope="{ row, column, $index }"
                        >
                          <table-header-box
                            uuid="e04a4502"
                            :label="column.label"
                          />
                        </template>

                        <template slot-scope="{ row, column, $index }">
                          <box
                            data-id="450278e8"
                            :uuid="'450278e8'"
                            class="block-item"
                            :label="'box'"
                          >
                            <div>
                              <div class="drag-box" data-id="450278e8" />
                            </div>
                          </box>
                        </template>
                      </el-table-column>

                      <el-table-column label="">
                        <template
                          slot="header"
                          slot-scope="{ row, column, $index }"
                        >
                          <table-header-box
                            uuid="0278e8a9"
                            :label="column.label"
                          />
                        </template>

                        <template slot-scope="{ row, column, $index }">
                          <box
                            data-id="e8a9d521"
                            :uuid="'e8a9d521'"
                            class="block-item"
                            :label="'box'"
                          >
                            <div>
                              <div class="drag-box" data-id="e8a9d521" />
                            </div>
                          </box>
                        </template>
                      </el-table-column>

                      <el-table-column label="">
                        <template
                          slot="header"
                          slot-scope="{ row, column, $index }"
                        >
                          <table-header-box
                            uuid="a9d52163"
                            :label="column.label"
                          />
                        </template>

                        <template slot-scope="{ row, column, $index }">
                          <box
                            data-id="2163b79b"
                            :uuid="'2163b79b'"
                            class="block-item"
                            :label="'box'"
                          >
                            <div>
                              <div class="drag-box" data-id="2163b79b" />
                            </div>
                          </box>
                        </template>
                      </el-table-column>

                      <el-table-column label="">
                        <template
                          slot="header"
                          slot-scope="{ row, column, $index }"
                        >
                          <table-header-box
                            uuid="63b79b0e"
                            :label="column.label"
                          />
                        </template>

                        <template slot-scope="{ row, column, $index }">
                          <box
                            data-id="9b0ec4e8"
                            :uuid="'9b0ec4e8'"
                            class="block-item"
                            :label="'box'"
                          >
                            <div>
                              <div class="drag-box" data-id="9b0ec4e8" />
                            </div>
                          </box>
                        </template>
                      </el-table-column>

                      <el-table-column label="">
                        <template
                          slot="header"
                          slot-scope="{ row, column, $index }"
                        >
                          <table-header-box
                            uuid="0ec4e8bf"
                            :label="column.label"
                          />
                        </template>

                        <template slot-scope="{ row, column, $index }">
                          <box
                            data-id="e8bf625e"
                            :uuid="'e8bf625e'"
                            class="block-item"
                            :label="'box'"
                          >
                            <div>
                              <div class="drag-box" data-id="e8bf625e" />
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
          </component-box>
        </div>
      </div>
    </box>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{}]
    };
  },

  methods: {}
};
</script>
