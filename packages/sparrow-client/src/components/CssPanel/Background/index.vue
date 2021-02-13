<template>
  <div>
    <css-item label="背景类型">
      <s-radio-group
        v-model="backgroundForm.backgroundType"
        :list="backgroundTypeList"
      ></s-radio-group>
    </css-item>
    <css-item
      v-if="
        backgroundForm.backgroundType === '' ||
          backgroundForm.backgroundType === 'color'
      "
    >
      <el-input size="mini" placeholder="请输入内容">
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
    <div v-if="backgroundForm.backgroundType === 'image'">
      <css-item>
        <el-input
          size="mini"
          placeholder="请输入URL"
          v-model="backgroundForm.backgroundImage"
        ></el-input>
      </css-item>
      <css-item label="尺寸">
        <s-radio-group
          v-model="backgroundForm.backgroundSize"
          :list="backgroundSizeList"
        ></s-radio-group>
      </css-item>
      <css-item>
        <size :size="backgroundForm.size" />
      </css-item>
      <css-item label="定位">
        <background-position
          :background-position="backgroundForm.backgroundPosition"
        />
      </css-item>
      <css-item label="重复显示">
        <s-radio-group
          v-model="backgroundForm.backgroundRepeat"
          :list="backgroundRepeatList"
        ></s-radio-group>
      </css-item>
    </div>
  </div>
</template>
<script>
import CssItem from '../CssItem';
import SRadioGroup from '../RadioGroup';
import { Chrome } from 'vue-color';
import Size from '../Size';
import BackgroundPosition from '../BackgroundPosition';

export default {
  components: {
    CssItem,
    SRadioGroup,
    ChromePicker: Chrome,
    Size,
    BackgroundPosition
  },
  data() {
    return {
      backgroundForm: {
        backgroundType: '',
        backgroundColor: '',
        backgroundImage: '',
        backgroundSize: '',
        backgroundPosition: {
          left: '',
          top: ''
        },
        backgroundRepeat: '',
        size: {
          width: '',
          height: ''
        }
      },
      backgroundTypeList: [
        {
          label: 'color',
          icon: '颜色',
          value: 'color'
        },
        {
          label: 'image',
          icon: '图片',
          value: 'image'
        }
      ],
      backgroundSizeList: [
        {
          label: '默认',
          icon: '默认',
          value: ''
        },
        {
          label: 'contain',
          icon: '填充',
          value: 'contain'
        },
        {
          label: 'cover',
          icon: '覆盖',
          value: 'cover'
        }
      ],
      backgroundRepeatList: [
        {
          label: 'repeat',
          icon: '重复',
          value: 'repeat'
        },
        {
          label: 'repeat-x',
          icon: '重复x',
          value: 'repeat-x'
        },
        {
          label: 'repeat-y',
          icon: '重复y',
          value: 'repeat-y'
        },
        {
          label: 'no-repeat',
          icon: '不重复',
          value: 'no-repeat'
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped></style>
