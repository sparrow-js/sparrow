<template>
  <div>
    <css-item label="圆角">
      <s-radio-group v-model="borderForm.borderType" :list="borderRadiuslist" />
    </css-item>
    <css-item v-if="borderForm.borderType === 'radius-alone'">
      <border-radius :rect="borderForm.borderRadiusRect"></border-radius>
    </css-item>
    <css-item v-if="borderForm.borderType === 'radius'">
      <el-slider v-model="borderForm.borderRadius" show-input> </el-slider>
    </css-item>
    <css-item class="边框">
      <border-model :border-rect="borderForm.borderRect" />
    </css-item>
    <shadow-model :box-shadow="borderForm.boxShadow" />
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
        borderType: 'radius',
        border: '',
        borderRadiusRect: {
          borderTopLeftRadius: '',
          borderTopRightRadius: '',
          borderBottomLeftRadius: '',
          borderBottomRightRadius: '',
        },
        borderRect: {
          position: '',
          width: '',
          style: '',
          color: '',
        },
        borderRadius: 0,
        boxShadow: {
          hShadow: '',
          vShadow: '',
          blur: '',
          spread: '',
          color: '',
          inset: ''
        }
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
      ]
    };
  },
  watch: {
    borderForm: {
      handler: function(val, oldVal) {
        this.$emit('change', this.cssForm);
      },
      deep: true
    }
  }
};
</script>
<style lang="scss" scoped></style>
