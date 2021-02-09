<template>
  <div>
    <css-item label="圆角">
      <s-radio-group :list="borderRadiuslist" />
    </css-item>
    <css-item>
      <border-radius></border-radius>
    </css-item>
    <css-item>
      <el-slider v-model="borderForm.borderRadius" show-input> </el-slider>
    </css-item>
    <css-item class="边框">
      <border-model />
    </css-item>
    <shadow-model />
  </div>
</template>
<script>
import SRadioGroup from '../RadioGroup';
import CssItem from '../CssItem';
import BorderModel from '../BorderModel';
import BorderRadius from '../BorderRadius';
import ShadowModel from '../ShadowModel';

export default {
  components: {
    SRadioGroup,
    BorderModel,
    CssItem,
    BorderRadius,
    ShadowModel
  },
  data() {
    return {
      borderForm: {
        border: '',
        borderTopLeftRadius: '',
        borderTopRightRadius: '',
        borderBottomLeftRadius: '',
        borderBottomRightRadius: '',
        borderRadius: 0,
        boxShadow: ''
      },
      borderRadiuslist: [
        {
          label: '固定圆角',
          icon: '固定圆角',
          value: 'radius'
        },
        {
          label: '独立定义',
          icon: '独立定义',
          value: 'radius-alone'
        }
      ],
    };
  }
};
</script>
<style lang="scss" scoped></style>
