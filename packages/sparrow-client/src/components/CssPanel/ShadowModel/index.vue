<template>
  <div>
    <css-item label="阴影">
      <div class="mb10">
        <s-radio-group :list="shadowList" />
      </div>
      <div class="mb10">
        <el-input size="mini" placeholder="请输入内容" v-model="input2">
          <template slot="append">
            <el-popover placement="bottom" width="225" trigger="click">
              <chrome-picker></chrome-picker>
              <span slot="reference">color</span>
            </el-popover>
          </template>
        </el-input>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :span="12">
            <css-item width="30px" label="X">
              <el-input-number
                class="width70"
                size="mini"
                controls-position="right"
              ></el-input-number>
            </css-item>
          </el-col>
          <el-col :span="12">
            <css-item width="30px" label="Y">
              <el-input-number
                class="width70"
                size="mini"
                controls-position="right"
              ></el-input-number>
            </css-item>
          </el-col>
          <el-col :span="12">
            <css-item width="30px" label="模糊">
              <el-input-number
                class="width70"
                size="mini"
                controls-position="right"
              ></el-input-number>
            </css-item>
          </el-col>
          <el-col :span="12">
            <css-item width="30px" label="扩展">
              <el-input-number
                class="width70"
                size="mini"
                controls-position="right"
              ></el-input-number>
            </css-item>
          </el-col>
        </el-row>
      </div>
    </css-item>
  </div>
</template>
<script>
import SRadioGroup from '../RadioGroup';
import { Chrome } from 'vue-color';
import CssItem from '../CssItem';

export default {
  components: {
    SRadioGroup,
    ChromePicker: Chrome,
    CssItem
  },
  data() {
    return {
      shadowList: [
        {
          label: '外阴影',
          icon: '外阴影',
          value: ''
        },
        {
          label: '内阴影',
          icon: '内阴影',
          value: 'inset'
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.width70{
  width: 65px;
}
.mb10{
  margin-bottom: 10px;
}
</style>
