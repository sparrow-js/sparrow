<template>
  <div>
    <css-item label="阴影">
      <div>
        <s-radio-group :list="shadowList" />
      </div>
      <div>
        <el-input placeholder="请输入内容" v-model="input2">
          <template slot="append">
            <el-popover placement="bottom" width="225" trigger="click">
              <chrome-picker
                v-model="borderForm.backgroundColor"
              ></chrome-picker>
              <span slot="reference">color</span>
            </el-popover>
          </template>
        </el-input>
      </div>
      <div>
        <div>
          <css-item label="X">
            <el-input-number controls-position="right"></el-input-number>
          </css-item>
        </div>
        <div>
          <css-item label="Y">
            <el-input-number controls-position="right"></el-input-number>
          </css-item>
        </div>
        <div>
          <css-item label="模糊">
            <el-input-number controls-position="right"></el-input-number>
          </css-item>
        </div>
        <div>
          <css-item label="扩展">
            <el-input-number controls-position="right"></el-input-number>
          </css-item>
        </div>
      </div>
    </css-item>
  </div>
</template>
<script>
import SRadioGroup from '../RadioGroup';
import { Chrome } from 'vue-color';

export default {
  components: {
    SRadioGroup,
    ChromePicker: Chrome
  },
  data() {
    return {
      shadowList: [
        {
          label: '外阴影',
          icon: '',
          value: ''
        },
        {
          label: '内阴影',
          icon: '',
          value: 'inset'
        }
      ]
    };
  }
};
</script>
