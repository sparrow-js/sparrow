<template>
  <div>
    <css-item label="背景类型">
      <s-radio-group :list="backgroundTypeList"></s-radio-group>
    </css-item>
    <css-item>
      <el-input size="mini" placeholder="请输入内容" v-model="input2">
        <template slot="append">
          <el-popover placement="bottom" width="225" trigger="click">
            <chrome-picker
              v-model="backgroundForm.backgroundColor"
            ></chrome-picker>
            <span slot="reference">color</span>
          </el-popover>
        </template>
      </el-input>
    </css-item>
    <css-item>
      <el-input
        size="mini"
        placeholder="请输入URL"
        v-model="backgroundForm.backgroundImage"
      ></el-input>
    </css-item>
    <css-item label="尺寸">
      <s-radio-group :list="backgroundSizeList"></s-radio-group>
    </css-item>
    <css-item label="重复显示">
      <s-radio-group :list="backgroundRepeatList"></s-radio-group>
    </css-item>
  </div>
</template>
<script>
import CssItem from '../CssItem';
import SRadioGroup from '../RadioGroup';
import { Chrome } from 'vue-color';

export default {
  components: {
    CssItem,
    SRadioGroup,
    ChromePicker: Chrome
  },
  data() {
    return {
      backgroundForm: {
        backgroundColor: '',
        backgroundImage: '',
        backgroundSize: '',
        backgroundPosition: '',
        backgroundRepeat: ''
      },
      backgroundTypeList: [
        {
          label: 'color',
          icon: '',
          value: 'color'
        },
        {
          label: 'image',
          icon: '',
          value: 'image'
        }
      ],
      backgroundSizeList: [
        {
          label: '默认',
          icon: '',
          value: ''
        },
        {
          label: 'contain',
          icon: '',
          value: 'contain'
        },
        {
          label: 'cover',
          icon: '',
          value: 'cover'
        }
      ],
      backgroundRepeatList: [
        {
          label: 'repeat',
          icon: '',
          value: ''
        },
        {
          label: 'repeat-x',
          icon: '',
          value: ''
        },
        {
          label: 'repeat-y',
          icon: '',
          value: ''
        },
        {
          label: 'no-repeat',
          icon: '',
          value: ''
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped></style>
