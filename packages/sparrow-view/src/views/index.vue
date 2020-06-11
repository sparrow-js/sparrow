<template>
  <div class="home">
    <div class="block-list">
      <div class="block-list">
        <box :uuid="'ba783b9a'" class="block-item">
          <div>
            <el-button
              type="primary"
              size="small"
              @click="dialogVisibleHandler783b9a3e"
              >弹窗</el-button
            >
            <div class="comp-box">
              <el-dialog
                width="70%"
                title="收货地址"
                :visible.sync="dialogVisible"
              >
                <div class="dialog-home">
                  <div class="block-list">
                    <box :uuid="'3b9a3ea2'" class="block-item">
                      <div class="box">
                        <Basic />
                      </div>
                    </box>
                  </div>

                  <div class="block-list">
                    <box :uuid="'a2887340'" class="block-item">
                      <paragraph
                        :type="'Container'"
                        :emit="'client.component.show'"
                        :params="{ uuid: 'a2887340' }"
                      />
                    </box>
                  </div>
                </div>
              </el-dialog>
            </div>
          </div>
        </box>
      </div>
    </div>

    <div class="block-list">
      <div class="block-list">
        <box :uuid="'9a3ea288'" class="block-item">
          <div class="box">
            <BasicTable />
          </div>
        </box>
      </div>
    </div>

    <div class="block-list">
      <div class="block-list">
        <box :uuid="'6f028b67'" class="block-item">
          <paragraph
            :type="'Container'"
            :emit="'client.component.show'"
            :params="{ uuid: '6f028b67' }"
          />
        </box>
      </div>
    </div>
  </div>
</template>

<script>
import BasicTable from "./components/BasicTable";
import Basic from "./components/Basic";
import generatorMixin from "../mixins/generatorMixin";
export default {
  data() {
    return {
      dialogVisible: false
    };
  },

  methods: {
    dialogVisibleHandler783b9a3e() {
      this.dialogVisible = !this.dialogVisible;
    }
  },
  components: {
    Basic,
    BasicTable
  },
  mixins: [generatorMixin]
};
</script>
