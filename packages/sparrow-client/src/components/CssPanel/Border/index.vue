<template>
  <div>
    <css-item label="圆角">
      <s-radio-group :list="borderRadiuslist" />
    </css-item>
    <css-item>
      <border-radius></border-radius>
    </css-item>
    <css-item>
      <el-slider v-model="value" show-input> </el-slider>
    </css-item>
    <css-item class="边框">
      <border-model />
    </css-item>
    <shadow />
  </div>
</template>
<script>
import SRadioGroup from '../RadioGroup';
import CssItem from '../CssItem';
import BorderModel from '../BorderModel';
import BorderRadius from '../BorderRadius';
import Shadow from '../Shadow';

export default {
  components: {
    SRadioGroup,
    BorderModel,
    CssItem,
    BorderRadius,
    Shadow
  },
  data() {
    return {
      borderForm: {
        border: '',
        borderTopLeftRadius: '',
        borderTopRightRadius: '',
        borderBottomLeftRadius: '',
        borderBottomRightRadius: '',
        borderRadius: '',
        boxShadow: ''
      },
      borderRadiuslist: [
        {
          label: '固定圆角',
          icon: '',
          value: ''
        },
        {
          label: '独立定义',
          icon: '',
          value: ''
        }
      ],
    };
  }
};
</script>
<style lang="scss" scoped></style>
