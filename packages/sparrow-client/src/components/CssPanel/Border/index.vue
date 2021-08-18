<template>
<div class="style-config-border">
  <div @click="handlChildOpen">
      <CaretDownOutlined v-if="childOpen"/>
      <CaretRightOutlined v-else />
    <span>边框</span>
  </div>
  <div v-show="childOpen">
    <div class="card-box">
      <div class="border-box">
        <a-row>
          <a-col :span="12">
            <div class="border-setter-left-pane">
              <div class="border-setter-row">
                <div 
                  @click="handleBorderSelect('left')"
                  :class="{'border-selected': borderDirection === 'left'}"
                >
                  <span data-tip="左边框">┣</span>
                </div>
              </div>
              <div class="border-setter-row">
                <div 
                  @click="handleBorderSelect('top')"
                  :class="{'border-selected': borderDirection === 'top'}"
                >
                  <span data-tip="上边框" data-spm-anchor-id="a1z13ml.21220313.0.i44.5f311a5ahTtkAt">┳</span>
                </div>
                <div 
                  @click="handleBorderSelect('')"
                  :class="{'border-selected': borderDirection === ''}"
                >
                  <span data-tip="全部">╋</span>
                </div>
                <div 
                  @click="handleBorderSelect('bottom')"
                  :class="{'border-selected': borderDirection === 'bottom'}"
                >
                  <span data-tip="下边框">┻</span>
                </div>
              </div>
              <div class="border-setter-row">
                <div 
                  @click="handleBorderSelect('right')"
                  :class="{'border-selected': borderDirection === 'right'}"
                >
                  <span data-tip="右边框">┫</span>
                </div>
              </div>
            </div>
          </a-col>

          <a-col :span="12">
            <a-form-item :colon="false" label="线形">
              <a-select 
                :value="borderStyle"
                @change="handleChange('borderStyle', $event)"
              >
                <a-select-option 
                  v-for="item in borderStyleLsit"
                  :key="item.value"
                  :value="item.value"
                >
                  {{item.label}}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :colon="false" label="宽">
              <a-input-group compact>
                <a-input-number 
                  style="width: 50%"
                  :value="borderWidth.value"
                  @change="handleObjectChange('borderWidth', 'value', $event)"
                />
                <a-select 
                  :value="borderWidth.unit"
                  @change="handleObjectChange('borderWidth', 'unit', $event)"
                >
                  <a-select-option value="px">
                    px
                  </a-select-option>
                  <a-select-option value="%">
                    %
                  </a-select-option>
                </a-select>
              </a-input-group>
            </a-form-item>
            <a-form-item :colon="false" label="颜色">
              <a-input :value="borderColor" @change="handleChange('borderColor', $event)"/>
            </a-form-item>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="card-box">
      <a-row>
        <a-col :span="12">
          <div class="border-setter-left-pane">
            <div class="border-setter-row">
              <div 
                @click="handleBorderRadiusSelect('left-top')"
                :class="{'border-selected': borderRadiusDirection === 'left-top'}"
              >
                <span data-tip="左上角">┏</span>
              </div>
              <div 
                @click="handleBorderRadiusSelect('left-bottom')"
                :class="{'border-selected': borderRadiusDirection === 'left-bottom'}"
              >
                <span data-tip="左下角">┗</span>
              </div>
            </div>
            <div class="border-setter-row">
              <div 
                @click="handleBorderRadiusSelect('')"
                :class="{'border-selected': borderRadiusDirection === ''}"
              >
                <span data-tip="全部">╋</span>
              </div>
            </div>
            <div class="border-setter-row">
              <div 
                @click="handleBorderRadiusSelect('right-top')"
                :class="{'border-selected': borderRadiusDirection === 'right-top'}"
              >
                <span data-tip="右上角">┓</span>
              </div>
              <div 
                @click="handleBorderRadiusSelect('right-bottom')"
                :class="{'border-selected': borderRadiusDirection === 'right-bottom'}"
              >
                <span data-tip="右下角">┛</span>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="12">
          <a-form-item :colon="false" label="圆角">
            <a-input-group compact>
              <a-input-number 
                style="width: 50%"
                :value="borderRadiusWidth.value"
                @change="handleObjectChange('borderRadiusWidth', 'value', $event)"
              />
              <a-select
                :value="borderRadiusWidth.unit"
                @change="handleObjectChange('borderRadiusWidth', 'unit', $event)"
              >
                <a-select-option value="px">
                  px
                </a-select-option>
                <a-select-option value="%">
                  %
                </a-select-option>
              </a-select>
            </a-input-group>
          </a-form-item>
        </a-col>
      </a-row>
      
    </div>
  </div>
  
  
</div>
</template>
<script>
import { reactive, toRefs } from 'vue';
const customEvents = [
  'update:borderDirection',
  'update:borderWidth',
  'update:borderStyle',
  'update:borderColor',
  'update:borderRadiusDirection',
  'update:borderRadiusWidth'
]
export default {
  props: {
    borderDirection: {
      type: String,
      default: '',
    },
    borderWidth: {
      type: Object,
      default() {return {}}
    },
    borderStyle: {
      type: String,
      default: '',
    },
    borderColor: {
      type: String,
      default: '',
    },
    borderRadiusDirection: {
      type: String,
      default: '',
    },
    borderRadiusWidth: {
      type: Object,
      default() {return {}}
    }
  },
  emits: customEvents,
  setup (props, {emit}) {
    const state = reactive({
      childOpen: false,
      borderStyleLsit: [
        {
          value: 'none',
          label: '无',
        },
        {
          value: 'solid',
          label: '实线',
        },
        {
          value: 'dotted',
          label: '点线',
        },
        {
          value: 'dashed',
          label: '虚线',
        }
      ]
    })
    const handlChildOpen = () => {
      state.childOpen = !state.childOpen;
    };

    const handleBorderSelect = (direction) => {
      emit('update:borderDirection', direction);
    }

    const handleBorderRadiusSelect = (direction) => {
      emit('update:borderRadiusDirection', direction);
    }

    const handleObjectChange = (key1, key2, data) => {
      const currentProp = props[key1];
      let temp = {};
      if (key2 === 'value') {
        temp = {
          value: data,
          unit: currentProp['unit'],
        }
      } else {
        temp = {
          value: currentProp.value,
          unit: data,
        }
      }
      emit(`update:${key1}`, temp);
    }

    const handleChange = (type, data) => {
      emit(`update:${type}`,data.target ? data.target.value : data);
    }

    return {
      ...toRefs(state),
      handlChildOpen,
      handleBorderSelect,
      handleBorderRadiusSelect,
      handleObjectChange,
      handleChange
    }
  }
}
</script>
<style lang="less" scoped>
.card-box{
  background-color: rgba(31,56,88,.04);
  padding: 8px;
  margin-bottom: 6px;
}
.border-setter-left-pane{
  width: 90px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .border-setter-row{
    &>div{
      box-sizing: border-box;
      background: linear-gradient(hsla(0,0%,100%,.3),hsla(0,0%,100%,.1));
      margin: 2px;
      padding: 5px;
      border-radius: 2px;
      text-align: center;
      cursor: pointer;
    }
    .border-selected{
      background: linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.2));
    }
  }
}

</style>
<style lang="less">
.style-config-border .ant-form-item-label{
  margin-bottom: 10px;
}
</style>