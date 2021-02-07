<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div></div>
      </el-col>
      <el-col :span="12">
        <div>
          <el-input-number
            v-model="num"
            controls-position="right"
            @change="handleChange"
          ></el-input-number>
        </div>
        <div>
          <el-input placeholder="请输入内容" v-model="input2">
            <template slot="append">
              <el-popover placement="bottom" width="225" trigger="click">
                <chrome-picker
                  v-model="backgroundForm.backgroundColor"
                ></chrome-picker>
                <span slot="reference">color</span>
              </el-popover>
            </template>
          </el-input>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { Chrome } from 'vue-color';

export default {
  components: {
    ChromePicker: Chrome
  }
};
</script>
<style lang="scss" scoped></style>
