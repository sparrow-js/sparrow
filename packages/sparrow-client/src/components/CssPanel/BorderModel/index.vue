<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div class="quick-list">
          <el-tooltip class="item" effect="dark" content="上" placement="top">
            <div class="quick-item item-all">
              <span @click="positionHandler('top')">上</span>
            </div>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="左" placement="top">
            <div class="quick-item item-3">
              <span @click="positionHandler('left')">左</span>
            </div>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="中" placement="top">
            <div class="quick-item item-3">
              <span @click="positionHandler('middle')">中</span>
            </div>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="右" placement="top">
            <div class="quick-item item-3">
              <span @click="positionHandler('right')">右</span>
            </div>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="下" placement="top">
            <div class="quick-item item-all">
              <span @click="positionHandler('bottom')">下</span>
            </div>
          </el-tooltip>
        </div>
      </el-col>
      <el-col :span="12">
        <el-input-number
          class="width100 mb10"
          size="mini"
          controls-position="right"
          v-model="borderRect.width"
        ></el-input-number>

        <el-input
          v-model="borderRect.color"
          class="mb10"
          size="mini"
          placeholder="请输入内容"
        >
          <template slot="append">
            <el-popover placement="bottom" width="225" trigger="click">
              <chrome-picker v-model="borderRect.color"></chrome-picker>
              <span slot="reference">color</span>
            </el-popover>
          </template>
        </el-input>
      </el-col>
    </el-row>
    <div>
      <s-radio-group
        v-model="borderRect.style"
        :list="borderStyleList"
      ></s-radio-group>
    </div>
  </div>
</template>
<script>
import { Chrome } from 'vue-color';
import SRadioGroup from '../RadioGroup';

export default {
  props: {
    borderRect: {
      type: Object,
      default() {
        return {
          position: '',
          width: '',
          style: '',
          color: '',
        };
      }
    }
  },
  components: {
    ChromePicker: Chrome,
    SRadioGroup
  },
  data() {
    return {
      borderForm: {
        backgroundColor: '#FFFFFF'
      },
      borderStyleList: [
        {
          label: 'none',
          icon: '无',
          value: 'none'
        },
        {
          label: 'solid',
          icon: '实线',
          value: 'solid'
        },
        {
          label: 'dashed',
          icon: '虚线',
          value: 'dashed'
        },
        {
          label: 'dotted',
          icon: '点线',
          value: 'dotted'
        }
      ]
    };
  },
  methods: {
    positionHandler(type) {
      if (this.borderRect.position === type) {
        this.borderRect.position = '';
      } else {
        this.borderRect.position = type;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.quick-list {
  display: flex;
  flex-wrap: wrap;
  .quick-item {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      width: 20px;
      height: 20px;
      border: 1px solid #333;
      padding: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .item-all {
    flex: 0 0 100%;
  }
  .item-3 {
    flex: 0 0 33.33%;
  }
}
.width100{
  width: 100px;
}
.mb10{
  margin-bottom: 10px;
}
</style>
