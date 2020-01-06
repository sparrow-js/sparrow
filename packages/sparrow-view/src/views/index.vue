<template>
  <div class="home">
    <div class="block-list">
      <box :index="0" class="block-item">
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

            <el-form-item label="基础checkbox" slot="0_2">
              <el-checkbox-group>
                <el-checkbox label="美食/餐厅线上活动" name="type" />
                <el-checkbox label="地推活动" name="type" />
                <el-checkbox label="线下主题活动" name="type" />
                <el-checkbox label="单纯品牌曝光" name="type" />
              </el-checkbox-group>
            </el-form-item>

            <el-form-item label="活动区域" slot="1_0">
              <el-select placeholder="请选择">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
            </el-form-item>
          </layout>
        </el-form>
      </box>
    </div>

    <div class="block-list">
      <box :index="1" class="block-item">
        <paragraph />
      </box>
    </div>
  </div>
</template>
<script>
import generatorMixin from "../mixins/generatorMixin";
export default {
  mixins: [generatorMixin]
};
</script>
