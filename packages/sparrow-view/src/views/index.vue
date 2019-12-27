<template>
  <div class="home">
    <div class="block-list">
      <box :index="0" class="block-item">
        <paragraph></paragraph>
      </box>
      <box :index="1" class="block-item">
        <layout :col="3" :row="2">
          <div slot="0_1" @click="handlerClickLabel">
            <el-form :model="form" class="demo-form-inline" label-width="120px">
              <el-form-item label="审批人">
                <el-input v-model="form.user" placeholder="审批人"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <el-switch slot="0_0" v-model="form.delivery"></el-switch>
          <el-switch v-model="form.delivery"></el-switch>
        </layout>
      </box>
    </div>
  </div>
</template>
<script>
import generatorMixin from '../mixins/generatorMixin';
export default {
  mixins: [generatorMixin]
};
</script>
