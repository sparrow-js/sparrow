<template>
  <div>
    <css-item label="定位类型">
      <el-select
        size="mini"
        v-model="locationForm.position"
        clearable
        placeholder="请选择"
      >
        <el-option
          v-for="item in positionOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </css-item>
    <css-item v-if="locationForm.position !== 'static'">
      <position-model
        :position="locationForm.position"
        :position-size="locationForm.positionSize"
      ></position-model>
    </css-item>
    <css-item label="清除位置">
      <el-input-number
        size="mini"
        v-model="locationForm.zIndex"
        controls-position="right"
      ></el-input-number>
    </css-item>
    <css-item label="浮动">
      <s-radio-group
        v-model="locationForm.float"
        :list="floatList"
      ></s-radio-group>
    </css-item>
    <css-item label="清除浮动">
      <s-radio-group
        v-model="locationForm.clear"
        :list="clearList"
      ></s-radio-group>
    </css-item>
  </div>
</template>
<script>
import CssItem from '../CssItem';
import SRadioGroup from '../RadioGroup';
import PositionModel from '../PositionModel';

export default {
  components: {
    CssItem,
    SRadioGroup,
    PositionModel
  },
  data() {
    return {
      locationForm: {
        position: '',
        zIndex: '',
        float: '',
        clear: '',
        positionSize: {
          top: '',
          left: '',
          bottom: '',
          right: ''
        },
      },
      positionOptions: [
        {
          label: '无定位 Static',
          value: 'static'
        },
        {
          label: '相对定位 Relative',
          value: 'relative'
        },
        {
          label: '绝对定位 Absolute',
          value: 'absolute'
        },
        {
          label: '固定定位 Fixed',
          value: 'fixed'
        },
        {
          label: '粘性定位 sticky',
          value: 'sticky'
        }
      ],
      floatList: [
        {
          label: 'none',
          icon: '不',
          value: 'none',
        },
        {
          label: 'left',
          icon: '左',
          value: 'left',
        },
        {
          label: 'right',
          icon: '右',
          value: 'right',
        }
      ],
      clearList: [
        {
          label: 'none',
          icon: '不',
          value: 'none',
        },
        {
          label: 'left',
          icon: '左',
          value: 'left',
        },
        {
          label: 'right',
          icon: '右',
          value: 'right',
        },
        {
          label: 'both',
          icon: '左右',
          value: 'both',
        },
      ]
    };
  },
  watch: {
    cssForm: {
      handler: function(val, oldVal) {
        this.$emit('change', this.cssForm);
      },
      deep: true
    }
  }
};
</script>
