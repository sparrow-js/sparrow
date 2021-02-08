<template>
  <div>
    <css-item label="字符">
      <div>
        <div>
          <el-select size="mini" v-model="value" placeholder="请选择">
            <el-option
              v-for="item in fontWeightOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-input-number
            size="mini"
            v-model="num"
            controls-position="right"
            :min="0"
            :max="1000"
          ></el-input-number>
        </div>
        <div>
          <el-input size="mini" placeholder="请输入内容" v-model="input2">
            <template slot="append">
              <el-popover placement="bottom" width="225" trigger="click">
                <chrome-picker v-model="fontForm.color"></chrome-picker>
                <span slot="reference">color</span>
              </el-popover>
            </template>
          </el-input>
          <el-input size="mini" v-model="fontForm.lineHeight" placeholder="行距"></el-input>
        </div>
      </div>
    </css-item>
    <css-item label="透明度">
      <div>
        <el-slider size="mini" min="0" max="100" v-model="fontForm.opacity" show-input> </el-slider>
      </div>
    </css-item>
  </div>
</template>
<script>
import CssItem from '../CssItem';
import { Chrome } from 'vue-color';

export default {
  components: {
    CssItem,
    ChromePicker: Chrome
  },
  data() {
    return {
      fontForm: {
        fontWeight: '',
        fontSize: '',
        color: '#000000',
        lineHeight: '',
        textAlign: '',
        verticalAlign: '',
        opacity: 1
      },
      fontWeightOptions: [
        {
          value: 'normal',
          label: '正常'
        },
        {
          value: 'bold',
          label: '粗体'
        },
        {
          value: 'lighter',
          label: '细体'
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped></style>
