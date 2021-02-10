<template>
  <div>
    <css-item label="字符">
      <div>
        <div>
          <el-select
            v-model="fontForm.fontWeight"
            class="mb10"
            size="mini"
            placeholder="请选择"
          >
            <el-option
              v-for="item in fontWeightOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-input-number
            class="mb10"
            size="mini"
            controls-position="right"
          ></el-input-number>
        </div>
        <div>
          <el-input
            v-model="fontForm.color"
            class="mb10"
            size="mini"
            placeholder="请输入内容"
          >
            <template slot="append">
              <el-popover placement="bottom" width="225" trigger="click">
                <chrome-picker v-model="fontForm.color"></chrome-picker>
                <span slot="reference">color</span>
              </el-popover>
            </template>
          </el-input>
          <el-input
            class="mb10"
            size="mini"
            v-model="fontForm.lineHeight"
            placeholder="行距"
          ></el-input>
        </div>
      </div>
    </css-item>
    <css-item lang="对齐方式">
      <s-radio-group
        v-model="fontForm.textAlign"
        :list="textAlignList"
      ></s-radio-group>
    </css-item>
    <css-item>
      <s-radio-group
        v-model="fontForm.verticalAlign"
        :list="verticalAlignList"
      ></s-radio-group>
    </css-item>
    <css-item label="透明度">
      <div>
        <el-slider size="mini" v-model="fontForm.opacity" show-input>
        </el-slider>
      </div>
    </css-item>
  </div>
</template>
<script>
import CssItem from '../CssItem';
import { Chrome } from 'vue-color';
import SRadioGroup from '../RadioGroup';

export default {
  components: {
    CssItem,
    ChromePicker: Chrome,
    SRadioGroup
  },
  data() {
    return {
      fontForm: {
        fontWeight: '',
        fontSize: '',
        color: '',
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
      ],
      textAlignList: [
        {
          label: 'left',
          icon: '左',
          value: 'left',
        },
        {
          label: 'center',
          icon: '中',
          value: 'center',
        },
        {
          label: 'right',
          icon: '右',
          value: 'right',
        },
        {
          label: 'justify',
          icon: '两端',
          value: 'justify',
        }
      ],
      verticalAlignList: [
        {
          label: 'baseline',
          icon: '基线',
          value: 'baseline',
        },
        {
          label: 'top',
          icon: '上',
          value: 'top',
        },
        {
          label: 'bottom',
          icon: '下',
          value: 'bottom',
        },
        {
          label: 'middle',
          icon: '居中',
          value: 'middle',
        }
      ]
    };
  },
  watch: {
    fontForm: {
      handler: function(val, oldVal) {
        this.$emit('change', this.fontForm);
      },
      deep: true
    }
  }
};
</script>
<style lang="scss" scoped>
.mb10{
  margin-bottom: 10px;
}
</style>
