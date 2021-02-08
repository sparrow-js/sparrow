<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div class="quick-list">
          <el-tooltip class="item" effect="dark" content="上" placement="top">
            <div class="quick-item item-all">
              <span>上</span>
            </div>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="左" placement="top">
            <div class="quick-item item-3">
              <span>左</span>
            </div>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="中" placement="top">
            <div class="quick-item item-3">
              <span>中</span>
            </div>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="右" placement="top">
            <div class="quick-item item-3">
              <span>右</span>
            </div>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="下" placement="top">
            <div class="quick-item item-all">
              <span>下</span>
            </div>
          </el-tooltip>
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <el-input-number size="mini" controls-position="right"></el-input-number>
        </div>
        <div>
          <el-input size="mini" placeholder="请输入内容" v-model="input2">
            <template slot="append">
              <el-popover placement="bottom" width="225" trigger="click">
                <chrome-picker
                  v-model="borderForm.backgroundColor"
                ></chrome-picker>
                <span slot="reference">color</span>
              </el-popover>
            </template>
          </el-input>
        </div>
      </el-col>
    </el-row>
    <div>
      <s-radio-group :list="borderStyleList"></s-radio-group>
    </div>
  </div>
</template>
<script>
import { Chrome } from 'vue-color';
import SRadioGroup from '../RadioGroup';

export default {
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
          icon: '',
          value: 'none',
        },
        {
          label: 'solid',
          icon: '',
          value: 'solid',
        },
        {
          label: 'dashed',
          icon: '',
          value: 'dashed',
        },
        {
          label: 'dotted',
          icon: '',
          value: 'dotted',
        },
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.quick-list{
  display: flex;
  flex-wrap: wrap;
  .quick-item{
    display: flex;
    justify-content: center;
    align-items: center;
    span{
      width: 20px;
      height: 20px;
    }
  }
  .item-all{
    flex: 0 0 100%;
  }
  .item-3{
    flex: 0 0 33.33%;
  }
}
</style>
