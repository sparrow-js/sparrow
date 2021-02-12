<template>
  <div class="background-position">
    <div class="quick-list">
      <div class="quick-item" v-for="item in quickList" :key="item.value">
        <span>
          {{ item.label }}
        </span>
      </div>
    </div>
    <div>
      <css-item label="左" width="30px">
        <el-input
          size="mini"
          placeholder="请输入内容"
          v-model="backgroundPosition.left"
        ></el-input>
      </css-item>
      <css-item label="顶" width="30px">
        <el-input
          size="mini"
          placeholder="请输入内容"
          v-model="backgroundPosition.top"
        ></el-input>
      </css-item>
    </div>
  </div>
</template>
<script>
import CssItem from '../CssItem';

export default {
  props: {
    backgroundPosition: {
      type: Object,
      default() {
        return {
          left: '',
          top: ''
        };
      }
    }
  },
  components: {
    CssItem
  },
  data() {
    return {
      quickList: [
        {
          icon: '',
          value: 'left-up',
          label: '左上'
        },
        {
          icon: '',
          value: 'up',
          label: '上'
        },
        {
          icon: '',
          value: 'right-up',
          label: '右上'
        },
        {
          icon: '',
          value: 'left',
          label: '左'
        },
        {
          icon: '',
          value: 'middle',
          label: '中'
        },
        {
          icon: '',
          value: 'right',
          label: '右'
        },
        {
          icon: '',
          value: 'down-left',
          label: '左下'
        },
        {
          icon: 'down',
          value: 'down',
          label: '下'
        },
        {
          icon: '',
          value: 'down-right',
          label: '右下'
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.background-position {
  display: flex;
  flex-direction: row;
}
.quick-list {
  display: flex;
  flex-wrap: wrap;
  width: 100px;
  height: 80px;
  flex-shrink: 0;
  margin-right: 5px;
  .quick-item {
    flex: 0 0 33.33%;
    justify-content: center;
    span {
      width: 28px;
      display: flex;
      justify-content: center;
      border: 1px solid #333;
      font-size: 12px;
    }
  }
}
</style>
