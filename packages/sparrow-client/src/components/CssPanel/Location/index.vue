<template>
  <div>
    <css-item label="定位类型">
      <el-select size="mini" v-model="locationForm.position" clearable placeholder="请选择">
        <el-option
          v-for="item in positionOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </css-item>
    <css-item>
      <position-model></position-model>
    </css-item>
    <css-item label="清除位置">
      <el-input-number
        size="mini"
        v-model="locationForm.zIndex"
        controls-position="right"
      ></el-input-number>
    </css-item>
    <css-item label="浮动">
      <s-radio-group :list="floatList"></s-radio-group>
    </css-item>
    <css-item label="清除浮动">
      <s-radio-group :list="clearList"></s-radio-group>
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
        clear: ''
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
          icon: '',
          value: 'none',
        },
        {
          label: 'left',
          icon: '',
          value: 'left',
        },
        {
          label: 'right',
          icon: '',
          value: 'right',
        }
      ],
      clearList: [
        {
          label: 'none',
          icon: '',
          value: 'none',
        },
        {
          label: 'left',
          icon: '',
          value: 'left',
        },
        {
          label: 'right',
          icon: '',
          value: 'right',
        },
        {
          label: 'both',
          icon: '',
          value: 'both',
        },
      ]
    };
  }
};
</script>
