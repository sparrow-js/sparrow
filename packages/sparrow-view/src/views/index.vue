<template>
  <div class="home">
    <div class="block-list">
      <box :index="0" class="block-item">
        <block><BasicTable4 /></block>
      </box>
    </div>

    <div class="block-list">
      <box :index="1" class="block-item">
        <el-form label-width="100px">
          <layout :col="3" :row="2">
            <div
              style="width: 100%;height: 48px;background: #EEE;text-align: center;line-height: 48px;"
              slot="0_0"
            >
              站位
            </div>

            <el-form-item label="基础文本框" prop="name" slot="0_1">
              <el-input />
            </el-form-item>
          </layout>
        </el-form>
      </box>
    </div>

    <div class="block-list">
      <box :index="2" class="block-item">
        <paragraph />
      </box>
    </div>
  </div>
</template>
<script>
import BasicTable4 from "./components/BasicTable4";
import generatorMixin from "../mixins/generatorMixin";
export default {
  components: {
    BasicTable4,
    BasicTable4,
    BasicTable4,
    BasicTable4
  },
  mixins: [generatorMixin]
};
</script>
