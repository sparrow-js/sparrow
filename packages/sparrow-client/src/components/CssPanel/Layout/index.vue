<template>
  <div class="layout-box">
    <css-item label="布局模式">
      <div>
        <s-radio-group
          :value="cssForm.display"
          :list="layoutList"
          @change="layoutStyleChange('display', $event)"
        />
      </div>
    </css-item>
    <css-item>
      <box-model :boxModelForm="boxModelForm" @change="boxModelChange"/>
    </css-item>
    <css-item>
      <size />
    </css-item>
  </div>
</template>
<script>
import CssItem from '../CssItem';
import SRadioGroup from '../RadioGroup';
import BoxModel from '../BoxModel';
import Size from '../Size';
export default {
  components: {
    CssItem,
    SRadioGroup,
    BoxModel,
    Size,
  },
  data() {
    return {
      cssForm: {
        display: '',
        boxModelForm: {
          margin_top: '',
          margin_bottom: '',
          margin_left: '',
          margin_right: '',
          padding_top: '',
          padding_bottom: '',
          padding_left: '',
          padding_right: ''
        },
        size: {
          width: '',
          height: ''
        }
      },
      font: {},
      layoutList: [
        {
          label: '内联布局 inline',
          icon: '',
          value: 'inline',
        },
        {
          label: '弹性布局 flex',
          icon: 'flex',
          value: 'flex',
        },
        {
          label: '块级布局 block',
          icon: 'block',
          value: 'block',
        },
        {
          label: '行内块级 inline-block',
          icon: 'inline-block',
          value: 'inline-block',
        },
        {
          label: '隐藏',
          icon: 'none',
          value: 'none',
        }
      ],
      flexDirectionList: [
        {
          label: 'row',
          icon: '',
          value: 'row',
        },
        {
          label: 'column',
          icon: '',
          value: 'column',
        },
        {
          label: 'row-reverse',
          icon: '',
          value: 'row-reverse',
        },
        {
          label: 'column-reverse',
          icon: '',
          value: 'column-reverse',
        }
      ],
      justifyContentList: [
        {
          label: 'flex-start',
          icon: '',
          value: 'flex-start',
        },
        {
          label: 'flex-end',
          icon: '',
          value: 'flex-end',
        },
        {
          label: 'center',
          icon: '',
          value: 'center',
        },
        {
          label: 'space-between',
          icon: '',
          value: 'space-between',
        },
        {
          label: 'space-around',
          icon: '',
          value: 'space-around',
        },
      ],
      alignItemsList: [
        {
          label: 'flex-start',
          icon: '',
          value: 'flex-start'
        },
        {
          label: 'flex-end',
          icon: '',
          value: 'flex-end'
        },
        {
          label: 'center',
          icon: '',
          value: 'center'
        },
        {
          label: 'baseline',
          icon: '',
          value: 'baseline'
        },
        {
          label: 'stretch',
          icon: '',
          value: 'stretch'
        }
      ],
      flexWrapList: [
        {
          label: 'nowrap',
          icon: '',
          value: 'nowrap'
        },
        {
          label: 'wrap',
          icon: '',
          value: 'wrap'
        },
        {
          label: 'wrap-reverse',
          icon: '',
          value: 'wrap-reverse'
        }
      ]
    };
  },
  methods: {
    layoutStyleChange(type, data) {
      if (type) {
        this.cssForm[type] = data.value;
      }
    },
    boxModelChange() {}
  }
};
</script>
<style lang="scss" scoped>
</style>