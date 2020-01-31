<template>
  <div class="home">
    <div class="block-list">
      <box :index="0" class="block-item">
        <block><SelectTable /></block>
      </box>
    </div>

    <div class="block-list">
      <box :index="1" class="block-item">
        <el-form label-width="100px">
          <layout :col="3" :row="2">
            <el-form-item label="基础文本框" prop="name" slot="0_0">
              <el-input />
            </el-form-item>

            <el-form-item label="基础文本框" prop="name" slot="0_2">
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
import SelectTable from "./components/SelectTable";
import generatorMixin from "../mixins/generatorMixin";
export default {
  components: {
    SelectTable
  },
  mixins: [generatorMixin]
};
</script>
