<template>
  <div class="home">
    <div class="block-list">
      <div class="block-list">
        <box :uuid="'e9287a7e'" class="block-item">
          <div class="box">
            <Basic />
          </div>
        </box>
      </div>
    </div>

    <div class="block-list">
      <div class="block-list">
        <box :uuid="'446987f6'" class="block-item">
          <div>
            <el-button
              type="primary"
              size="small"
              @click="dialogVisibleHandler6987f6e8"
              >弹窗</el-button
            >
            <div class="comp-box">
              <el-dialog title="收货地址" :visible.sync="dialogVisible">
                <div class="dialog-home">
                  <div class="block-list">
                    <box :uuid="'87f6e844'" class="block-item">
                      <paragraph
                        :type="'Container'"
                        :emit="'client.component.show'"
                        :params="{ uuid: '87f6e844' }"
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
        <box :uuid="'f6e84485'" class="block-item">
          <paragraph
            :type="'Container'"
            :emit="'client.component.show'"
            :params="{ uuid: 'f6e84485' }"
          />
        </box>
      </div>
    </div>
  </div>
</template>

<script>
import Basic from "./components/Basic";
import generatorMixin from "../mixins/generatorMixin";
export default {
  data() {
    return {
      dialogVisible: false
    };
  },

  methods: {
    dialogVisibleHandler6987f6e8() {
      this.dialogVisible = !this.dialogVisible;
    }
  },
  components: {
    Basic
  },
  mixins: [generatorMixin]
};
</script>
