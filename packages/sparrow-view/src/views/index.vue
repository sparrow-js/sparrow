<template>
  <div class="home">
    <div class="block-list">
      <div class="block-list">
        <box :uuid="'2a19d058'" class="block-item">
          <div class="box">
            <BasicForm />
          </div>
        </box>
      </div>
    </div>

    <div class="block-list">
      <div class="block-list">
        <box :uuid="'d058107e'" class="block-item">
          <div>
            <el-button
              type="primary"
              size="small"
              @click="dialogVisibleHandler7ec6756e"
              >弹窗</el-button
            >
            <div class="comp-box">
              <el-dialog title="收货地址" :visible.sync="dialogVisible">
                <div class="dialog-home">
                  <div class="block-list">
                    <box :uuid="'c6756eb4'" class="block-item">
                      <div class="box">
                        <Basic />
                      </div>
                    </box>
                  </div>

                  <div class="block-list">
                    <box :uuid="'b4834863'" class="block-item">
                      <paragraph
                        :type="'Container'"
                        :emit="'client.component.show'"
                        :params="{ uuid: 'b4834863' }"
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
        <box :uuid="'756eb483'" class="block-item">
          <paragraph
            :type="'Container'"
            :emit="'client.component.show'"
            :params="{ uuid: '756eb483' }"
          />
        </box>
      </div>
    </div>
  </div>
</template>

<script>
import Basic from "./components/Basic";
import BasicForm from "./components/BasicForm";
import generatorMixin from "../mixins/generatorMixin";
export default {
  data() {
    return {
      dialogVisible: false
    };
  },

  methods: {
    dialogVisibleHandler7ec6756e() {
      this.dialogVisible = !this.dialogVisible;
    }
  },
  components: {
    BasicForm,
    Basic
  },
  mixins: [generatorMixin]
};
</script>
