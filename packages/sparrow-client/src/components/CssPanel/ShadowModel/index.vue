<template>
  <div>
    <css-item label="阴影">
      <div class="mb10">
        <s-radio-group v-model="boxShadow.inset" :list="shadowList" />
      </div>
      <div class="mb10">
        <el-input
          v-model="boxShadow.color"
          size="mini"
          placeholder="请输入内容"
        >
          <template slot="append">
            <el-popover placement="bottom" width="225" trigger="click">
              <chrome-picker v-model="boxShadow.color"></chrome-picker>
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
                v-model="boxShadow.hShadow"
              ></el-input-number>
            </css-item>
          </el-col>
          <el-col :span="12">
            <css-item width="30px" label="Y">
              <el-input-number
                class="width70"
                size="mini"
                controls-position="right"
                v-model="boxShadow.vShadow"
              ></el-input-number>
            </css-item>
          </el-col>
          <el-col :span="12">
            <css-item width="30px" label="模糊">
              <el-input-number
                class="width70"
                size="mini"
                controls-position="right"
                v-model="boxShadow.blur"
              ></el-input-number>
            </css-item>
          </el-col>
          <el-col :span="12">
            <css-item width="30px" label="扩展">
              <el-input-number
                class="width70"
                size="mini"
                v-model="boxShadow.spread"
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
  props: {
    boxShadow: {
      type: Object,
      default() {
        return {
          hShadow: '',
          vShadow: '',
          blur: '',
          spread: '',
          color: '',
          inset: ''
        };
      }
    }
  },
  components: {
    SRadioGroup,
    ChromePicker: Chrome,
    CssItem
  },
  data() {
    return {
      shadowForm: {
        background: ''
      },
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
