<template>
  <div class="layout-box">
    <css-item label="布局模式">
      <div>
        <s-radio-group v-model="cssForm.display" :list="layoutList" />
      </div>
    </css-item>
    <css-item>
      <box-model :boxModelForm="cssForm.boxModelForm" />
    </css-item>
    <div v-show="cssForm.display === 'flex'">
      <css-item label="主轴方向">
        <s-radio-group
          v-model="cssForm.flexDirection"
          :list="flexDirectionList"
        />
      </css-item>

      <css-item label="主轴对齐">
        <s-radio-group
          v-model="cssForm.justifyContent"
          :list="justifyContentList"
        />
      </css-item>

      <css-item label="辅轴对齐">
        <s-radio-group v-model="cssForm.alignItems" :list="alignItemsList" />
      </css-item>

      <css-item label="换行">
        <s-radio-group v-model="cssForm.flexWrap" :list="flexWrapList" />
      </css-item>
    </div>

    <css-item>
      <size :size="cssForm.size" />
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
    Size
  },
  data() {
    return {
      cssForm: {
        display: '',
        flexDirection: '',
        justifyContent: '',
        alignItems: '',
        flexWrap: '',
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
      layoutList: [
        {
          label: '内联布局 inline',
          icon: '内联',
          value: 'inline'
        },
        {
          label: '弹性布局 flex',
          icon: '弹性',
          value: 'flex'
        },
        {
          label: '块级布局 block',
          icon: '块级',
          value: 'block'
        },
        {
          label: '行内块级 inline-block',
          icon: '行内块',
          value: 'inline-block'
        },
        {
          label: '隐藏',
          icon: '隐藏',
          value: 'none'
        }
      ],
      flexDirectionList: [
        {
          label: 'row',
          icon: '水平',
          value: 'row'
        },
        {
          label: 'column',
          icon: '垂直',
          value: 'column'
        },
        {
          label: 'row-reverse',
          icon: '逆水平',
          value: 'row-reverse'
        },
        {
          label: 'column-reverse',
          icon: '逆垂直',
          value: 'column-reverse'
        }
      ],
      justifyContentList: [
        {
          label: 'flex-start',
          icon: '左对',
          value: 'flex-start'
        },
        {
          label: 'flex-end',
          icon: '右对',
          value: 'flex-end'
        },
        {
          label: 'center',
          icon: '中心',
          value: 'center'
        },
        {
          label: 'space-between',
          icon: '两端',
          value: 'space-between'
        },
        {
          label: 'space-around',
          icon: '横向平',
          value: 'space-around'
        }
      ],
      alignItemsList: [
        {
          label: 'flex-start',
          icon: '起点',
          value: 'flex-start'
        },
        {
          label: 'flex-end',
          icon: '终点',
          value: 'flex-end'
        },
        {
          label: 'center',
          icon: '中心',
          value: 'center'
        },
        {
          label: 'baseline',
          icon: '基线',
          value: 'baseline'
        },
        {
          label: 'stretch',
          icon: '容器',
          value: 'stretch'
        }
      ],
      flexWrapList: [
        {
          label: 'nowrap',
          icon: '不换行',
          value: 'nowrap'
        },
        {
          label: 'wrap',
          icon: '换行',
          value: 'wrap'
        },
        {
          label: 'wrap-reverse',
          icon: '逆换行',
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
  },
  watch: {
    cssForm: {
      handler: function(val, oldVal) {
        this.$emit('change', {
          css: this.cssForm,
          type: 'layout'
        });
      },
      deep: true
    }
  }
};
</script>
<style lang="scss" scoped></style>
